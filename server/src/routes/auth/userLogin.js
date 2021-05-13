var express = require('express');
var router = express.Router();
const { connectToRedis } = require('../../redisClient/connection');

module.exports =  router.post('/user-login', function (req, res) {
        try {
            let { email, password } = req.body;
            if(!password in req.body || !email in req.body) res.status(500).send({ message: 'Missing creds, Bad request!' });
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
                    res.status(500).send({ message : 'Could not find suitable user'});
                }
            })
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    });