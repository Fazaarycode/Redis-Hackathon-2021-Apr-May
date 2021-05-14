// Upload CSV files
const upload = require('./middleware')
var express = require('express');
var router = express.Router();
const {verify}  = require('../routes/auth/jwt/verifyJWT');
const autoCompleteSetter = require('../routes/search/autocompleteSetter');

const autoSearchInit = async (fileName) => {
    return autoCompleteSetter(fileName);
}
// verify -- Include this Middleware
module.exports = router.post('/upload-csv', verify, async function (req, res) {
    try {
        await upload(req, res);
        if (req.file == undefined) {
            return res.status(400).send({ message: "Choose a file to upload" });
        }
        if(req.file && req.file.originalname) await autoSearchInit(req.file.originalname);

        res.status(200).send({
            message: "File uploaded successfully: " + req.file.originalname
        });
    } catch (err) {
        console.log(err);

        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: `File size should be less than ${process.env.MAX_FILE_UPLOAD_SIZE_IN_MBs}`,
            });
        }

        res.status(500).send({
            message: `Error occured: ${err}`,
        });
    }
});


