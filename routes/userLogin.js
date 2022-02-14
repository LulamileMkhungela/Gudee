const express = require('express')
const router = express.Router()

router.get('/login/id', (request, response) => {
    response.send("login page is working succesfully"
    )
})


module.exports = router