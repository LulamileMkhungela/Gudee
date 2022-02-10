const router = require('express').Router();
const uploadImage = require('../middleware/uploadImage');

const uploadCtrl= require('../controllers/uploadCtrl');


router.post('/upload_avatar', uploadImage, uploadCtrl.uplpadAvater);

const uploadImage = require();

module.exports =router;