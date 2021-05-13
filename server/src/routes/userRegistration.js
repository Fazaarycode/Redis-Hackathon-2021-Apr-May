const Redis = require("ioredis");
var express = require('express');
var router = express.Router();
const { client } = require('../redisClient/connection');
// User Registration
module.exports = router.post('/user-registration', function (req, res) {
    try {
        // Check if User exists in Redis Cache.
        let { email } = req.body;
        client.get(email, async (err, user) => {
            if (err) throw err;
            if (user) {
                res.status(200).send({
                    user: email,
                    message: "User found in cache"
                });
            }
            else {
                client.set(email, JSON.stringify(req.body));
                res.json({
                    email,
                    message: "cache miss"
                });
            }
        })

    } catch (err) {
        res.status(500).send({ message: err });
    }
});
