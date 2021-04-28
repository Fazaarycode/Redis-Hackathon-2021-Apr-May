const redis = require("redis");
const {promisify} = require('util');
const client = redis.createClient(process.env.REDIS_URL);

module.exports = {
    ...client,
    getAsync: promisify(client.get).bind(client),
    setAsync: promisify(client.set).bind(client),
    keysAsync: promisify(client.keys).bind(client)
  };

// clientConnection = () => {
//     let client = redis.createClient({
//         port: 6379,
//         host: 'redis',
//         password: 'secret' // as given in docker-compose.yml file
//     });
//     console.log(`💚 You are connected to Redis Instance 💚`)
//     return client;
// }

// module.exports = {
//     connectToRedis: () => {
//         try {
//             return clientConnection();
//         } catch (err) {
//                 console.log(`💔 Couldn't connect to Redis 💔 ${err}`);
//                 throw new Error(err);
//         }
//     },

// };