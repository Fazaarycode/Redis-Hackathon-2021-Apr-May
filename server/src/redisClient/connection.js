const redis = require("redis");

clientConnection = () => {
    let client = redis.createClient({
        port: 6379,
        host: 'redis',
        password: 'secret' // as given in docker-compose.yml file
    });
    console.log(`💚 You are connected to Redis Instance 💚`)
    return client;
}

module.exports = {
    connectToRedis: () => {
        try {
            return clientConnection();
        } catch (err) {
                console.log(`💔 Couldn't connect to Redis 💔 ${err}`);
                throw new Error(err);
        }
    },

};