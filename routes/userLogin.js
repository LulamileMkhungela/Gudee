const router = require('express').Router()
const userloginCtrl = require("../controllers/loginUserCtrl")
const auth = require('../middleware/authSeller')
//const authAdmin = require('../middleware/authAdmin')

router.post('/register', userloginCtrl.register);
router.post('/login', userloginCtrl.login)

router.post('/refresh_token', userloginCtrl.getAccessToken)

router.post('/forgotpassword', userloginCtrl.forgotPassword)

router.post('/resetpassword', userloginCtrl.resetPassword)

router.get('/infor', auth, userloginCtrl.getUserInfor)



router.get('/logout', userloginCtrl.logout)



module.exports = router;