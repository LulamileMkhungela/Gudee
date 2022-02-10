

const router = require("express").Router();
<<<<<<<< HEAD:backend/routes/auth.js

========
>>>>>>>> 25c2e7fcd43c62b589f74a0931047fca85946bd2:routes/auth.js
const User = require('../models/User');
const crypto = require('crypto'); 

const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../controllers/sendMail');

const { Error } = require('mongoose');
// Register
router.post ( "/register", async (req,res,next) =>{
    const signedUpUser= await new User({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password
    })
 
try {

     await signedUpUser.save();
     

      
    sendToken(signedUpUser,200,res);
  

    
    
} catch (error) {
    res.status(500).json({
        success:false,
        error:error.message
    });
    
}
});
//Login
router.post( "/login", async (req,res,next) =>{

    const {email,password}= req.body;
    if(!email || !password){
    res.status(400).json({success:false,error:"Please provide email and password"})
    }
    try {
        const user= await User.findOne({email}).select("+password");

        if(!user){
            res.status(404).json({success:false,error:"invalid credintials"})


        }
        const isMatched = await user.matchPasswords(password)

        if(!isMatched){
            res.status(404).json({success:false,error:"invalid credintials"})


        }
        sendToken(user,201,res);
        
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
        });
    }

});
//Forgot password

router.post ( "/forgotpassword", async (req,res,next) =>{

   const {email} = req.body;
   try {
    const user = await Users.findOne({email})
    if(!user) return res.status(400).json({success:false,error: "This email does not exist."})

       const resetToken= user.getResetPasswordToken()

       await user .save();
const reseturl = `http://localhost:3000/passwordreset/${resetToken}`;

const message= `<h1> You have requested a password reset </h1>
<p> Please go to this link to reset your password </p>
<a href=${reseturl } clicktracking = off>${reseturl}  </a>

`
       try {
            await sendEmail({
                to: user.email, 
                subject:"Email reset passord",
                text: messages
            });
            res.status(200).json({success:true,data:"email sent"})
           
       } catch (error) {
           user.getResetPasswordToken= undefined;
           user.getResetPasswordExpire= undefined;

           await  user.save();
          return res.status(400).json({success:false,error: "This email does not exist."})
       }
   } catch (error) {
       next(error);
   }

});
// reset password
router.post ( "/resetpassword", async (req,res,next) =>{

    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {$gt:Date.now()}
        })
        if(!user){

            return res.status(400).json({success:false,error:"invalid Reset Token ,400"});
        }
       user.password= req.body.password;
       user.resetPasswordToken=undefined;
       user.resetPasswordExpire = undefined;

       await user.save();
       res.status(200).json({
           success:true,
           data:"password reset Success"
    })

    } catch (error) {
        next(error)
    }



});

const sendToken=(user,statusCode, res)=>{
    const token= user.getSignedToken();
    res.status(statusCode).json({success:true,token})


} 
//update user profile

router.post( "/update", async (req,res,next) =>{

    const  {avater}= req.body;
 try {
 

    await User.findOneAndUpdate({_id: req.params.id});
    avater
    res.json({success:true,data: "update  success"});

    //  const user= await User.create({
 
    //      firstname,lastname,email,password
    //  });
    //  sendToken(user,200,res);
     
     
 } catch (error) {
     res.status(500).json({
         success:false,
         error:error.message
     });
     
 }
 });









































 
// const{register,login,forgotpassword,resetpassword,update}= require('../controllers/auth')

// router.route("/register").post(register);

// router.route("/login").post(login);

// router.route("/forgotpassword").post(forgotpassword);

// router.route("/resetpassword/:resetToken").put(resetpassword);

// router.route("/update").patch(update);
















// the line below represent the line above just syntax
//router.post("/register,")

// const passport = require("passport");

// const CLIENT_URL = "http://localhost:3000/";

// router.get("/login/success", (req, res) => {
//   if (req.user) {
//     res.status(200).json({
//       success: true,
//       message: "successfull",
//       user: req.user,
//       //   cookies: req.cookies
//     });
//   }
// });

// router.get("/login/failed", (req, res) => {
//   res.status(401).json({
//     success: false,
//     message: "failure",
//   });
// });

// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect(CLIENT_URL);
// });






// router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );

module.exports = router