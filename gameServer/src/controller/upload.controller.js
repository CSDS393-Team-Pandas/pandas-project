const multer = require("multer");
const logger = require('../utils/logger');
const IMAGE = "upload";
const config = require('config')
const imageUpload = multer({ dest: `${IMAGE}/` })

// Verify the file carried by interface
const singleUploadMiddle = () => imageUpload.single('upload');

// Upload interface
const uploadHandler = async function(req,res){
    try {
        let name = '';
        if(!req.file) {
            return res.error('400300')
        } else {
            name = req.file.filename
        }
        url = `${config.get('baseUrl')}/api/preview/${name}`
        res.success({url})
    } catch(e) {
        res.error('400300')
    }
} 

// Picture preview
const imagePreviewHandler = function(req,res){
    try {
        res.sendFile(`/${req.params.key}`, {
            root: `${IMAGE}`
        })
    } catch(e) {
        logger.error(e)
    }
}

module.exports = {
    imagePreviewHandler,
    uploadHandler,
    singleUploadMiddle
}