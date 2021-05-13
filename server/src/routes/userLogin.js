var express = require('express');
var router = express.Router();
const { client } = require('../redisClient/connection');
let signJWT = require('./auth/jwt/signJWT')

module.exports =  router.post('/user-login', function (req, res) {
        try {
            const httpsCookie = process.env.ENVIRONMENT !== 'development';
            let { email , password } = req.body.payload;
            // Login use case doesn't require us setting us to Redis Cache.
            client.get(email, async (err, user) => { 
                if (err) throw err;
                let myUser = JSON.parse(user);
                if (myUser && myUser.password === password) {
                    let accessToken = await signJWT(myUser);
                    if(accessToken) {
                        res.cookie("jwt", accessToken, { 
                            httpOnly: true, 
                            secure: httpsCookie,
                            domain: req.hostname,
                            sameSite: 'strict',
                        })
                        res.status(200).json({ email, success: true }) // Other fields such as Name etc.
                    }
                }
                else {
                    res.status(304).send('Could not find suitable user');
                }
            })
        } catch (err) {
            res.status(500).send({ message: err.message });
        } 
    });