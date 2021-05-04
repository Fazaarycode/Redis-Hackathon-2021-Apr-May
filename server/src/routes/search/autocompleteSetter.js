var express = require('express');
var router = express.Router();
var Redis = require('ioredis');
const csv = require('csv-parser')
const fs = require('fs')
var connection = new Redis(process.env.REDIS_URL);
/**
 * This file has an endpoint that is used to add WORD-SUGGESTIONS to Redis using FT.SUGGET command.
 * curl http://localhost:3000/auto-complete-setter
 */
const helper = () => {
    try {
            fs.createReadStream('datasource/bfro_reports_geocoded.csv')
                .pipe(csv())
                .on('data', async data => {
                    let { number, title, date, observed, classification, county, state, latitude, longitude, location_details } = data

                    let id = parseInt(number)
                    title = title.replace(/^Report \d*: /, '')
                    county = county.replace(/ County$/, '')
                    let location = (longitude && latitude) ? `${longitude},${latitude}` : ''
                
                    let key = `sighting:${id}`
                    let values = { id, title, date, observed, classification, county, state, location, location_details }
                    await connection.call('FT.SUGADD', 'state', state, 1)
                    await connection.call('FT.SUGADD', 'title', title, 1)
                    await connection.call('FT.SUGADD', 'observed', observed, 1)
                    await connection.call('FT.SUGADD', 'location_details', location_details, 1)
                })
    }
    catch (error) {
        console.log('Error adding suggestion list. ', error)
    }
}

module.exports = router.get('/auto-complete-setter', async (req, res) => {
    try {
        // Pass in file name to this request to dynamically pick csv file and iterate that.
        // READ CSV, EXECUTE FT.SUGADD
        helper();
        res.send({ message: 'No errors, auto-completer done.'})
    }
    catch (err) {
        // res.statusCode(401)
        res.send({ message: `Failed to query due to ${err}` })
    }
})