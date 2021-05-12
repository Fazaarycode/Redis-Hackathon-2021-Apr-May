
const upload = require('./middleware')
var express = require('express');
var router = express.Router();
const {verify}  = require('../routes/auth/jwt/verifyJWT');
const autoCompleteSetter = require('../routes/search/autocompleteSetter');

const autoSearchInit = (fileName) => {
    autoCompleteSetter(fileName);
}
// verify -- Include this Middleware
module.exports = router.post('/upload-csv', verify, async function (req, res) {
    try {
        await upload(req, res);
        console.log('a....', req.file)
        if (req.file == undefined) {
            return res.status(400).send({ message: "Choose a file to upload" });
        }
        if(req.file && req.file.originalname) autoSearchInit(req.file.originalname);

        res.status(200).send({
            message: "File uploaded successfully: " + req.file.originalname
        });
    } catch (err) {
        console.log(err);

        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size should be less than 5MB",
            });
        }

        res.status(500).send({
            message: `Error occured: ${err}`,
        });
    }
});


