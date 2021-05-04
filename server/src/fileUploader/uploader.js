
const upload = require('./middleware')
var express = require('express');
var router = express.Router();
module.exports = router.post('/upload-csv', async function (req, res) {
    try {
        
        await upload(req, res);
        if (req.file == undefined) {
            return res.status(400).send({ message: "Choose a file to upload" });
        }

        res.status(200).send({
            message: "File uploaded successfully: " + req.file.originalname,
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


