// Destroy jwt based on jti when `logout` endpoint is invoked.
var Redis = require('ioredis');
var JWTR = require('jwt-redis').default;
var client = new Redis(process.env.REDIS_URL);
var jwtr = new JWTR(client);


let destroyJWT = async (token) => {
    const payload = await jwtr.decode(token,  process.env.JWT_SECRET);
    await jwtr.destroy(payload.jti);
}

module.exports = destroyJWT;