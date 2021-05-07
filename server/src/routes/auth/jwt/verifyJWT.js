var Redis = require('ioredis');
var JWTR = require('jwt-redis').default;
var crypto = require('crypto');
var client = new Redis(process.env.REDIS_URL);
var jwtr = new JWTR(client);

exports.verify = function(req, res, next){
    let accessToken = req.cookies.jwt
    console.log('AT ' , accessToken)
    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken){
        return res.status(403).send()
    }
    try{
        //use the jwt.verify method to verify the access token
        //throws an error if the token has expired or has a invalid signature
        return new Promise((resolve, reject) => {
            crypto.randomBytes(256, async function (ex, buf) {
                if (ex) reject(ex);
                await jwtr.verify(accessToken, buff );
                next();
                resolve();
            });
        })
    }
    catch(error){
        //if an error occured return request unauthorized error
        return res.status(401).send({ message: `JWT Verification failed due to ${error}`})
    }
}