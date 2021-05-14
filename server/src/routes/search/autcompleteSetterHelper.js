// A helper function that helps to populate the Search indexes and build Suggestion dictionaries
// based on the Row/Column values in our CSV dataset.
const csv = require('csv-parser')
const fs = require('fs')
var connection = require('../../redisClient/connection');
let pipeline = connection.pipeline();
const extractHeader = require('../../csvParsing/extractHeaders');
const indexConfiguration = require('../../indexBuilder/indexConfiguration');

let indexValue = 0;
const helper = async (fileName) => {
    try {
        let headers = await extractHeader(fileName);
        // Set an index for full text search.
        let indexSettings = await indexConfiguration(fileName,headers);
        console.log('Running :) ')
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

module.exports = helper;