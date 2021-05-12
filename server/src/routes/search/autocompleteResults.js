/**
 * I believe this should be called on every keystroke.
 * For every string type, runs FT.SUGGET against it. 
 * Decipher the header (key) for the string we check in FT.SUGGET command.
 * For quick escape, return all matching records for all the headers. 
 * Ex:  curl http://localhost:3000/auto-complete-results?keyString=saw
 */

const { verify } = require('../auth/jwt/verifyJWT');
var express = require('express');
var router = express.Router();
var Redis = require('ioredis');
var fs = require('fs');
var connection = new Redis(process.env.REDIS_URL);
var extractedHeaders = require('../../csvParsing/extractHeaders');

const listFiles = async () => {
    let files = [];
    fs.readdirSync('datasource').forEach(async file => {
        files.push(file);
    });
    let headersPerFile = {};
    let headers = await Promise.all(files.map(async fileName => {
        let x = await extractedHeaders(fileName);
        headersPerFile[fileName] = x;
        return x;
    }));
    return { files, headers, headersPerFile };
}

const matchingData = async (keyString, fileNameIndex, headers) => {
    let [count, ...foundMatchingKeys] = await connection.call('FT.SEARCH', `${fileNameIndex}:index`, keyString, 'LIMIT', 0, 100);
    let foundKeys = foundMatchingKeys.filter((entry, index) => index % 2 !== 0)

    console.log(`Command FT.SEARCH ${fileNameIndex}:index ${keyString}`)
    let allValues = foundKeys.map((eachValues, i) => {        
        let keys = eachValues.filter((_, index) => index % 2 === 0)
        let values = eachValues.filter((_, index) => index % 2 !== 0)
        return keys.reduce((eachRecord, key, index) => {
            eachRecord[key] = values[index]
            return eachRecord
        }, {})
    })

    // We have indexed every column. It is possible that our search results will be found for every one of the indexes for the same row.
    // We only non-duplicated full records.
    let filteredResults = Object.entries(allValues).filter(([k,v]) => Object.keys(v).length === headers.length);
    return { count, allValues }
    // return { count: filteredResults.length, allValues: filteredResults }
}

const arrayEquals = (a, b) => {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

const helper = async (keyString) => {
    try {
        let { files, headers, headersPerFile } = await listFiles();
        console.log('headersPerFile', headersPerFile)
        headers = headers.flat();
        let results = {};
        results['prefix'] = {};
        results['fuzzy'] = {};
        results['exactSingleWordMatch'] = {};
        // console.log('Headers', headers);
        await Promise.all(
            files.map(async fileName => {
                // Time to get data. 
                let exactSingleWordMatch = await matchingData(keyString, fileName, headers);
                // console.log('Exact Matches' , Array.isArray(exactSingleWordMatch));
                results['exactSingleWordMatch'][fileName] = [];
                results['exactSingleWordMatch'][fileName].push(exactSingleWordMatch, { searchType: 'exactSingleWordMatch' });
                results['prefix'][fileName] = [];
                results['fuzzy'][fileName] = [];
                // console.log('Records found for prefix match ', prefixMatch)
                await Promise.all((headers || []).map(async header => {
                    // console.log('each header', header)
                    let data = await connection.call('FT.SUGGET', header, keyString);
                    let fuzzy = await connection.call('FT.SUGGET', header, keyString, "FUZZY");
                    
                    if (Array.isArray(data)) {
                        data.length !== 0
                            ? results['prefix'][fileName].push(data)
                            : null
                    }

                    // Fuzzy and Prefix may have same data outputs
                    // Hence add the ones that are truly fuzzy to the resultant output
                    if (!arrayEquals(data.sort(), fuzzy.sort())) {
                        if (Array.isArray(fuzzy)) {
                            fuzzy.length !== 0
                                ? results['fuzzy'][fileName].push(fuzzy)
                                : null
                        }
                    }

                }))
            })
        );
        return results;
    }
    catch (error) {
        console.log('Error retrieving suggestions. ', error)
    }
}

// verify
module.exports = router.get('/auto-complete-results', async (req, res) => {
    try {
        let keyString = req.query.keyString;
        if (!keyString) return res.send({ data: [] })
        // Pass in file name to this request to dynamically pick csv file and iterate that.
        let result = await helper(keyString);
        res.setHeader('Content-Type', 'application/json');
        res.send({ data: result });
    }
    catch (err) {
        res.send({ message: `Failed to query due to ${err}` })
    }
})
