/**
 * I believe this should be called on every keystroke.
 * For every string type, runs FT.SUGGET against it. 
 * Decipher the header (key) for the string we check in FT.SUGGET command.
 * For quick escape, return all matching records for all the headers. 
 * Ex:  curl http://localhost:3000/auto-complete-results?keyString=saw
 */

var express = require('express');
var router = express.Router();
var Redis = require('ioredis');
var connection = new Redis(process.env.REDIS_URL);
var extractedHeaders = require('../../csvParsing/extractHeaders')

let previousCsvReadFileName = '';
let headers = []; // Extracted csv headers

const matchingData = async(keyString, fileNameIndex) => {
    let [count, ...foundMatchingKeys] = await connection.call('FT.SEARCH', `${fileNameIndex}:index`, keyString, 'LIMIT', 0, 100)
    let foundKeys = foundMatchingKeys.filter((entry, index) => index % 2 !== 0)
    let allValues = foundKeys.map(eachValues => {
      let keys = eachValues.filter((_, index) => index % 2 === 0)
      let values = eachValues.filter((_, index) => index % 2 !== 0)
      return keys.reduce((eachRecord, key, index) => {
        eachRecord[key] = values[index]
        return eachRecord
      }, {})
    })
    return { count, allValues }
}
const helper = async (keyString, fileName) => {
    try {
        let results = []; // Suggestions
        console.log('Previous csv datafile', previousCsvReadFileName);
        if (fileName !== previousCsvReadFileName) {
            headers = await extractedHeaders(fileName);
            previousCsvReadFileName = fileName;
        }
        console.log('Key string ', keyString);
        // Time to get data. 
        let exactMatch = await matchingData(keyString, fileName);
        console.log('Records found for exact match ', exactMatch)
        await Promise.all((headers || []).map(async header => {
   
            let data = await connection.call('FT.SUGGET', header, keyString);
            let fuzzy = await connection.call('FT.SUGGET', header, keyString);

            // console.log('Current Header ::: ### ' , header)
            // console.log('Data' , `FT.SUGGET ${header} ${keyString}`)
            // console.log('fuzzy' , fuzzy)
            if (Array.isArray(data)) {
                data.length !== 0
                    ? results.push(data, {searchType: 'prefix'})
                    : null
            }
            if (Array.isArray(fuzzy)) {
                fuzzy.length !== 0
                    ? results.push(fuzzy, {searchType: 'fuzzy'})
                    : null
            }
        }))
        console.log('All possible auto-correct suggestions: ' , results);
        return results;
    }
    catch (error) {
        console.log('Error retrieving suggestions. ', error)
    }
}

module.exports = router.get('/auto-complete-results', async (req, res) => {
    try {
        let keyString = req.query.keyString;
        // Pass in file name to this request to dynamically pick csv file and iterate that.
        let result = await helper(keyString);
        res.send({ message: 'Result set ', result })
    }
    catch (err) {
        // res.statusCode(401)
        res.send({ message: `Failed to query due to ${err}` })
    }
})



            // console.log('Query String' ,keyString)
            // ----- Data entered as follows ---------------------
            // console.log(`FT.SUGADD, ${header}, ${keyString} 1`);
            // ---------------------------------------------------