var Redis = require('ioredis');
const csv = require('csv-parser')
const fs = require('fs')
var connection = new Redis(process.env.REDIS_URL);
let pipeline = connection.pipeline();
const extractHeader = require('../../csvParsing/extractHeaders');
const indexConfiguration = require('../../indexBuilder/indexConfiguration');
/**
 * This file has an endpoint that is used to add WORD-SUGGESTIONS to Redis using FT.SUGGET command.
 * curl http://localhost:4000/auto-complete-setter
 */
let indexValue = 0;
const helper = async (fileName) => {
    try {
        let headers = await extractHeader(fileName);
        // Set an index for full text search.
        let indexSettings = await indexConfiguration(fileName,headers);
        await connection.call(...indexSettings);
        // Configuration for AutoCorrect - Prefix and Fuzzy
        fs.createReadStream(`datasource/${fileName}`)
            .pipe(csv())
            .on('data', async data => {
                let values = {};
                // Prefix and Fuzzy Search additions
                await Promise.all(
                    headers.map(async (header, idx) => {
                        values[header] = data[header];
                        pipeline.hset(`${fileName}:${indexValue++}`, values);
                        // console.log(`Command pipeline.hset(${fileName}:${indexValue++}, ${values});`)
                        await connection.call('FT.SUGADD', `${header.toString()}`, `${data[header].replace(/(\r\n|\n|\r)/gm, "")}`, 1);
                    })
                );

            })
            .on('end', () => {
                pipeline.exec();
              })
    }
    catch (error) {
        console.log('Error adding suggestion list. ', error)
    }
}

module.exports = async (fileName) => {
    try {
        // Pass in file name to this request to dynamically pick csv file and iterate that.
        await helper(fileName);
        return { message: 'No errors, auto-completer done.' };
    }
    catch (err) {
        // res.statusCode(401)
        throw new Error({ message: `Failed to query due to ${err}` });
    }
}
