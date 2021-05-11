const Redis = require("ioredis");
var express = require('express');
var router = express.Router();
const { client } = require('../redisClient/connection');
const { sanityCheckUserRegistration } = require('../validators/userValidation')
// User Registration
module.exports = router.post('/user-registration', function (req, res) {
    try {
        console.log('Hey there...', req.body)
        // sanityCheckUserRegistration(req.body) // Fix this spagetti.
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

// User Login

// User Registration

// User Login Request

// User Logout Request

// Retrieve Users list from Cache.

// Implement JWT


// router.get('/version', (req, res) => {
//     res.send(`Version found ${new Date().toISOString()}`)
// })

