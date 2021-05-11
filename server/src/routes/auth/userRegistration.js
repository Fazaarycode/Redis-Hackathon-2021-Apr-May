var express = require('express');
var router = express.Router();
const { connectToRedis } = require('../../redisClient/connection');
const { sanityCheckUserRegistration } = require('../../validators/userValidation')
// User Registration
module.exports = router.post('/user-registration', function (req, res) {
    try {
        // Sanity Check
        // sanityCheckUserRegistration(req.body)
        // Check if User exists in Redis Cache.
        let { userName } = req.body;
        connectToRedis().get(userName, async (err, user) => {
            if (err) throw err;
            if (user) {
                res.status(200).send({
                    user: JSON.parse(user),
                    message: "User found in cache"
                });
            }
            else {
                connectToRedis().setex(userName, 60000, JSON.stringify(req.body));
                res.status(200).send({
                    userData: req.body,
                    message: "cache miss"
                });
            }
        })

    } catch (err) {
        res.status(500).send({ message: err.message });
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
