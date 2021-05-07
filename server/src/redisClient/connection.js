const Redis = require("ioredis");
const {promisify} = require('util');
const client = new Redis('redis://cache:6379');

module.exports = {
    client,
    getAsync: promisify(client.get).bind(client),
    setAsync: promisify(client.set).bind(client),
    keysAsync: promisify(client.keys).bind(client)
  };
