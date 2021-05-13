var extractedHeaders = require('../../csvParsing/extractHeaders');
var fs = require('fs');

exports.listFiles = async () => {
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