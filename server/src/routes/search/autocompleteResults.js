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
 const csv = require('csv-parser')
 const fs = require('fs')
 var connection = new Redis(process.env.REDIS_URL);
 var extractedHeaders = require('../../csvParsing/extractHeaders')

 let previousCsvReadFileName = '';
 let headers = []; // Extracted csv headers

 const helper = async (keyString, fileName = 'bfro_reports_geocoded.csv') => {
    try {
        let results = []; // Suggestions
        console.log('Previous csv datafile' , previousCsvReadFileName);
        if(fileName !== previousCsvReadFileName) {
            headers = await extractedHeaders(fileName);
            previousCsvReadFileName = fileName;
        }
        // Time to get data. 
        await Promise.all((headers || []).map(async header => {
            console.log(`FT.SUGADD, ${header}, ${keyString} 1`);
            let data = await connection.call('FT.SUGGET', header, keyString);
            data.length !==0
            ? results.push(data)
            : null;
        }))
        console.log('R ? ', results)
        // console.log('All possible auto-correct suggestions: ' , results);
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
        res.send({ message: 'Result set ', result})
    }
    catch (err) {
        // res.statusCode(401)
        res.send({ message: `Failed to query due to ${err}` })
    }
})