// Redis client - Establish connection
const Redis = require("ioredis");
const client = new Redis('redis://cache:6379');

module.exports = {
    client,
  };
