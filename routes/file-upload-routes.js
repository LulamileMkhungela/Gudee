const express = require('express');
const {upload} = require('../helpers/filehelper');
const {
    ProductUserInfo, 
    getProductUserInfo
    } = require('../controllers/productUserInfoController'); 
const {
    singleFileUpload, 
    multipleFileUpload, 
    getallSingleFiles, 
    getallmultipleFiles
    } = require('../controllers/fileuploaderController');
const router = express.Router();

router.post('/singleFile', upload.single('file'), singleFileUpload);
router.post('/multiplefiles', upload.array('files'), multipleFileUpload);
router.get('/getSingleFiles', getallSingleFiles);
router.get('/getMultipleFiles', getallmultipleFiles);

module.exports = {
    routes: router
}