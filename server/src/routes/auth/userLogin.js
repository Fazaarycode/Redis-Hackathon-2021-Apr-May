var express = require('express');
var router = express.Router();
const { connectToRedis } = require('../../redisClient/connection');
const { sanityCheckLoginDetails } = require('../../validators/userValidation')

module.exports =  router.post('/user-login', function (req, res) {
        try {
            sanityCheckLoginDetails(req.body);
            let { userName, password } = req.body;
            // Login use case doesn't require us setting us to Redis Cache.
            connectToRedis().get(userName, async (err, user) => {
                if (err) throw err;
                let myUser = JSON.parse(user);
                if (myUser && myUser.password === password) {
                    res.status(200).send({
                        user: myUser,
                        message: "User exists in cache"
                    });
                } else {
                    throw new Error('Could not find suitable user');
                }
            })
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    });