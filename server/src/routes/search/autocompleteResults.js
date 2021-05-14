/**
 * I believe this should be called on every keystroke.
 * For every string type, runs FT.SUGGET against it. 
 * Decipher the header (key) for the string we check in FT.SUGGET command.
 * Ex:  curl http://localhost:4000/auto-complete-results?keyString=saw
 * Output depends on the data we have indexed.
 */

const { verify } = require('../auth/jwt/verifyJWT');
var express = require('express');
var router = express.Router();
var connection = require('../../redisClient/connection')
var { listFiles } = require('./listFilesHelper');

const matchingData = async (keyString, fileNameIndex, headers, headersPerFile, index) => {
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
    //  Object.entries(allValues).map(([k, v]) => console.log('V Len',Object.keys(v).length), 'H l ==> ', headers.length);
    let filteredResults = Object.entries(allValues).filter(([k, v]) => Object.keys(v).length === Object.values(headersPerFile)[index].length);
    // return { count, allValues }
    return { count: filteredResults.length, allValues: filteredResults }
}
// Check if array of values are same
const arrayEquals = (a, b) => {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}
// Return payloads, call helper methods, run SUGGET 
const helper = async (keyString) => {
    try {
        let { files, headers, headersPerFile } = await listFiles();
        headers = headers.flat();
        let results = {};
        results['prefix'] = {};
        results['fuzzy'] = {};
        results['exactSingleWordMatch'] = {};
        await Promise.all(
            files.map(async (fileName, index) => {
                // Time to get data. 
                let exactSingleWordMatch = await matchingData(keyString, fileName, headers, headersPerFile, index);
                results['exactSingleWordMatch'][fileName] = [];
                results['exactSingleWordMatch'][fileName].push(exactSingleWordMatch, { searchType: 'exactSingleWordMatch' });
                results['prefix'][fileName] = [];
                results['fuzzy'][fileName] = [];
                await Promise.all((headersPerFile[fileName] || []).map(async header => {
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
        )
        return results;
    }
    catch (error) {
        console.log('Error retrieving suggestions. ', error)
    }
}
// GET endpoint behind a middleware
module.exports = router.get('/auto-complete-results', verify, async (req, res) => {
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
