// Workout to redis data persistence
const { verify } = require('../auth/jwt/verifyJWT');
var express = require('express');
var router = express.Router();
var checkRedisKeys = require('../../initialConfigurationsChecker/checkIfKeysExists')
// GET endpoint behind a middleware
module.exports = router.get('/refresh-redis-keys', verify, async (req, res) => {
    try {
        await checkRedisKeys();
        res.send({ message: "Success" });
    }
    catch (err) {
        res.send({ message: `Failed to query due to ${err}` })
    }
})
