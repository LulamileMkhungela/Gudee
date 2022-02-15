const express = require('express');
const router = express.Router();

const {
    uploadProfile,
    getProfile
    } = require('../controllers/profileController');

router.post('/profile', uploadProfile);
router.get('./getProfile', getProfile);

module.exports = {
    routes: router
};