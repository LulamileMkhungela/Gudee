const express = require('express')
//const SignUpModels = require('../models/SignUpModels')
const router = express.Router()

const signUpTemplateCopy = require('../models/SignUpModels')

 
router.post('/signup', async (request,response)=>{

   const signedUpUser= await  new  signUpTemplateCopy({
       firstname:request.body.firstname,
       lastname:request.body.lastname,
       email:request.body.email,
       password:request.body.password
       

   })
   signedUpUser.save()
   .then(data=>{
       response.json(data)
   })
   .catch(error=>{
       response.json(error)
   })
})
//login
router.post('/login',(request,response)=>{
try {
    const userEmail = SignUpModels.findOne({email:request.body.email});
    !userEmail && response.status(401).json("Wrong email input")
    const userPassword= SignUpModels.findOne({password:rerquest.body.password})
    userPassword !==res.status(401).json("Wrong password input")

    res.status(200).json(userEmail,userPassword)
} catch (error) {
    res.status(500).json(err)
}

})


//Reset password
router.post('/reset-password',(request,response)=>{





})









module.exports = router