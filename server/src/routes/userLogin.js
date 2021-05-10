var express = require('express');
var router = express.Router();
const { client } = require('../redisClient/connection');
const { sanityCheckLoginDetails } = require('../validators/userValidation')
let signJWT = require('./auth/jwt/signJWT')

module.exports =  router.post('/user-login', function (req, res) {
        try {
            sanityCheckLoginDetails(req.body);
            let { userName, password } = req.body;
            // Login use case doesn't require us setting us to Redis Cache.
            client.get(userName, async (err, user) => {
                if (err) throw err;
                let myUser = JSON.parse(user);
                if (myUser && myUser.password === password) {
                    let accessToken = await signJWT(myUser);
                    if(accessToken) {
                        res.cookie("jwt", accessToken)
                        res.status(200).send({ userName }) // Other fields such as Name etc.
                    }
                }
                else {
                    throw new Error('Could not find suitable user');
                }
            })
        } catch (err) {
            res.status(500).send({ message: err.message });
        } 
    });