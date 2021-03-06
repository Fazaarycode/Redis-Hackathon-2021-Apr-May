// This is a configuration file that consturcts the search index based on the number of columns in our CSV dataset.
let redisClient = require('../redisClient/connection');
// This is a quick way and an assumption based approach to find out columns that store coordinates.
// @TODO: Must be a better way to achieve this.
const geoCoordinateLookups = ['latitude', 'longitude', 'coordinates', 'lat', 'long',];

// indexName -> fileName
const removeExistingIndex = async (fileName) => {
    let indices = await redisClient.call('FT._LIST');
    if (indices.includes(`${fileName}:index`)) {
        await redisClient.call('FT.DROPINDEX', `${fileName}:index`)
    }
}

module.exports = async (indexName, headers) => {
    await removeExistingIndex(indexName)
    // Check if index exists
    let initConfig = ['FT.CREATE', `${indexName}:index`, 'ON', 'hash', 'PREFIX', 1, `${indexName}`, 'SCHEMA'];
    let searchIndexes = [];
    headers.map((header) => {
        searchIndexes.push(header.replace(/.csv/,''), geoCoordinateLookups.includes(header) ? 'GEO' : 'TEXT');
    })
    return [...initConfig, ...searchIndexes];
} 
