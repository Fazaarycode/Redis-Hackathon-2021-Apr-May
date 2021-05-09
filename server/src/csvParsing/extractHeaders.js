// This is used to extract headers off of currently computing CSV file.
// We then form search indexes using this headers list = Faster search.

const csv = require('csv-parser')
const fs = require('fs')

module.exports = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(`datasource/${fileName}`)
        .pipe(csv())
        .on('headers', (headers) => {
            resolve(headers);
        })
        .on('error', err => reject(err))
    })
}
