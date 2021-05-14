// Sign JWT tokens for incoming requests
var Redis = require('ioredis');
var JWTR = require('jwt-redis').default;
var crypto = require('crypto');
var client = new Redis(process.env.REDIS_URL);
var jwtr = new JWTR(client);

const refreshTokenHelper = async (payload) => {
    return new Promise((resolve,reject) => {
         crypto.randomBytes(512, async function (ex, buffKey) {
            if (ex)  reject(ex);
            resolve(await jwtr.sign(payload, buffKey, { expiresIn: 5 })); // Seconds 
        });
    })
}

const accessTokenHelper = async (payload) => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(256, async function (ex, buf) {
            if (ex) reject(ex);
            token = await jwtr.sign(payload, process.env.JWT_SECRET, { expiresIn: 864000 }); // Seconds 
            await jwtr.destroy(token);
            resolve(token);
        });
    })
}  


    // Create a token
    let signJWT = async (payload) => {
        // await refreshTokenHelper(payload);
        let aToken = await accessTokenHelper(payload);
        // Use rToken when implemented, Just access tokens for now :)
        // let rToken = await refreshTokenHelper(payload);
        return aToken;
    }

    module.exports = signJWT;
