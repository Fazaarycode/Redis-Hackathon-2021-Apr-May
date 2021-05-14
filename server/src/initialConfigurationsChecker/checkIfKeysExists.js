// RediSearch volume persistence was not quite clear 
// Mounting data/dump.rdp caused connection failures to Redis client
var client = require('../redisClient/connection');

const helper = require('../routes/search/autcompleteSetterHelper');
var { listFiles } = require('../routes/search/listFilesHelper');
module.exports = async () => {
    // Check if Keys exists.
    // Get all the files from DIR
    let { files } = await listFiles();
    await Promise.all(files.map(async fileName => {
        // let exists = await client.call('KEYS', `user*`);
        let exists = await client.call('KEYS', `${fileName}:*`);
        console.log(`Command was 'KEYS', ${fileName}:*`)
        // Key didn't exists, go through the process of setting things up.
        if(exists.length === 0) {
            await helper(fileName)
        }
    }))
}