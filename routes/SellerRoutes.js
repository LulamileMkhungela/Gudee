const express = require('express')
const router = express.Router();

const {
    ProductUserInfo, 
    getProductUserInfo
    } = require('../controllers/productUserInfoController');

router.post('/person', ProductUserInfo);
router.get('/getPerson', getProductUserInfo);

module.exports = {
    routes: router
}