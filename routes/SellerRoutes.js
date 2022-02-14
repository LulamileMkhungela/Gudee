const express = require('express')
const router = express.Router();

const {
    productUserInfo,
    getProductUserInfo
    } = require('../controllers/productUserInfoController');

router.post('/person', productUserInfo);
router.get('/getPerson', getProductUserInfo);

module.exports = {
    routes: router
}