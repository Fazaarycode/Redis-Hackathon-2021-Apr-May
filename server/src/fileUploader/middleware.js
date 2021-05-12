const util = require("util");
const multer = require("multer");
var path = require('path');
const DIR = path.join(__dirname, '../../datasource'); // Destination where the file be saved for future purposes.


let storage = multer.diskStorage({
    destination: DIR,
    filename: (req, file, cb) => {
        console.log(file, '####### ')
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    },
});

let upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 6
    },
    fileFilter: (req, file, cb) => {
        console.log('cool', file)
        // Accept CSV only.
        if (file.mimetype == "text/csv") {
            cb(null, true);
        } 
        else {
            cb(null, false);
            return cb(new Error('File types allowed .csv at this time.'));
        }
    }
}).single("fileUpload"); // Key is important



let fileUploadMiddleware = util.promisify(upload);

module.exports = fileUploadMiddleware;