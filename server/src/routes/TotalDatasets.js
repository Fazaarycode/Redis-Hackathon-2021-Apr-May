// List all datasets
var { listFiles } = require('./search/listFilesHelper');
const { verify } = require('./auth/jwt/verifyJWT');
var express = require('express');
var router = express.Router();

module.exports = router.get('/total-datasets', verify, async (req, res) => {
    try {
        let { files } = await listFiles();
        res.send({ count: files.length, files})
    }
    catch (err) {
        res.send({ message: `Failed to query due to ${err}` })
    }
})
