/**
 * I believe this should be called on every keystroke.
 * For every string type, runs FT.SUGGET against it. 
 * Decipher the header (key) for the string we check in FT.SUGGET command.
 * For quick escape, return all matching records for all the headers. 
 * Ex:  curl http://localhost:3000/auto-complete-results?keyString=saw
 */

const {verify} = require('../auth/jwt/verifyJWT');
var express = require('express');
var router = express.Router();
var Redis = require('ioredis');
var fs = require('fs');
var connection = new Redis(process.env.REDIS_URL);
var extractedHeaders = require('../../csvParsing/extractHeaders');

const  listFiles = async() => {
    let files = [];
    fs.readdirSync('datasource').forEach(async file => {
        files.push(file);
    });
    let headers = await Promise.all(files.map(async fileName => extractedHeaders(fileName)));
    return {files, headers};
}

const matchingData = async (keyString, fileNameIndex) => {
    let [count, ...foundMatchingKeys] = await connection.call('FT.SEARCH', `${fileNameIndex}:index`, keyString, 'LIMIT', 0, 100)
    let foundKeys = foundMatchingKeys.filter((entry, index) => index % 2 !== 0)
    let allValues = foundKeys.map(eachValues => {
        let keys = eachValues.filter((_, index) => index % 2 === 0)
        let values = eachValues.filter((_, index) => index % 2 !== 0)
        return keys.reduce((eachRecord, key, index) => {
            console.log("keys" , key)
            eachRecord[key] = values[index]
            return eachRecord
        }, {})
    })
    return { count, allValues }
}
const helper = async (keyString) => {
    try {
        let {files, headers} = await listFiles();
        headers = headers.flat();
        let results = {};
        results['prefixAndFuzzy']={};
        results['exactSingleWordMatch'] = {};
        // console.log('Headers', headers);
        await Promise.all(
            files.map(async fileName => {
                // Time to get data. 
                let exactSingleWordMatch = await matchingData(keyString, fileName);
                console.log('Exact Matches' , Array.isArray(exactSingleWordMatch));
                results['exactSingleWordMatch'][fileName] = [];
                results['exactSingleWordMatch'][fileName].push(exactSingleWordMatch, { searchType: 'exactSingleWordMatch' });
                results['prefixAndFuzzy'][fileName] = [];
                // console.log('Records found for prefix match ', prefixMatch)
                await Promise.all((headers || []).map(async header => {
                    console.log('each header', header)
                    let data = await connection.call('FT.SUGGET', header, keyString);
                    let fuzzy = await connection.call('FT.SUGGET', header, keyString, "FUZZY");

                    if (Array.isArray(data)) {
                        data.length !== 0
                            ? results['prefixAndFuzzy'][fileName].push(data, { searchType: 'prefix' })
                            : null
                    }
                    if (Array.isArray(fuzzy)) {
                        fuzzy.length !== 0
                            ? results['prefixAndFuzzy'][fileName].push(fuzzy, { searchType: 'fuzzy' })
                            : null
                    }
                    // Fuzzy and Prefix may have same data outputs
                    // @TODO: filter if same.
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
        if(!keyString) return res.send({ data: []})
        // Pass in file name to this request to dynamically pick csv file and iterate that.
        let result = await helper(keyString);
        res.setHeader('Content-Type', 'application/json');
        res.send({ data: result});
    }
    catch (err) {
        res.send({ message: `Failed to query due to ${err}` })
    }
})
