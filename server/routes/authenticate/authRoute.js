const express = require('express')

const router = express.Router();

const registerController = require('../../controllers/authenticate/registerController')

router.post('/register/:id', registerController)

module.exports = router;