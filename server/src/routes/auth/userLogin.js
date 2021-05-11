var express = require('express');
var router = express.Router();
const { connectToRedis } = require('../../redisClient/connection');
const { sanityCheckLoginDetails } = require('../../validators/userValidation')

module.exports =  router.post('/user-login', function (req, res) {
        try {
            console.log('Hey there Login..?...', req.body)
            // sanityCheckLoginDetails(req.body);
            let { email, password } = req.body;
            // Login use case doesn't require us setting us to Redis Cache.
            connectToRedis().get(email, async (err, user) => {
                if (err) throw err;
                let myUser = JSON.parse(user);
                if (myUser && myUser.password === password) {
                    res.json({
                        user: myUser,
                        message: "User exists in cache"
                    });
                } else {
                    console.log('errored.. ')
                    throw new Error('Could not find suitable user');
                }
            })
        } catch (err) {
            console.log('Failed due to ', err)
            res.status(500).send({ message: err.message });
        }
    });