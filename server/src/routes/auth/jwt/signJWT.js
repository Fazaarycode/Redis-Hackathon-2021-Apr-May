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
            let tt = buf.toString('base64');
            console.log('SIGNING TOKEN ' , process.env.JWT_SECRET)
            token = await jwtr.sign(payload, process.env.JWT_SECRET, { expiresIn: 864000 }); // Seconds 
            console.log('FF ? ,', token)
            resolve(token);
        });
    })
}

    // Create a token
    let signJWT = async (payload) => {
        // await refreshTokenHelper(payload);
        let aToken = await accessTokenHelper(payload);
        console.log('ATOKEN ', aToken)
        let rToken = await refreshTokenHelper(payload);
        console.log('rTOKEN ', rToken)

        return aToken;
    }

    module.exports = signJWT;



 //create the refresh token with the longer lifespan
        // var decoded = await jwtr.verify(sign, buf);
        // console.log('Token ', sign);
        // console.log('Decoded ', decoded);