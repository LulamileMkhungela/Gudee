const { Select } = require('@mui/material');
const User = require('../models/User');
const crypto = require('crypto'); 

const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const SendEmail= require('../utils/sendEmail');
const { Error } = require('mongoose');

exports.register=  async (req,res,next) =>{
    const signedUpUser= await new User({
        firstname:request.body.firstname,
        lastname:request.body.lastname,
        email:request.body.email,
        password:request.body.password
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
};

exports.login=  async (req,res,next) =>{

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

};
exports.forgotpassword= async (req,res,next) =>{

   const {email} = req.body;
   try {
       const user = await User.findOne({email});

       if(!user){
        return next(new ErrorResponse("email could not be sent",404));

       }
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
           return next(new ErrorResponse("email could not be sent",500));
       }
   } catch (error) {
       next(error);
   }

};

exports.resetpassword=  async (req,res,next) =>{

    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {$gt:Date.now()}
        })
        if(!user){

            return next(new ErrorResponse("invalid Reset Token ,400"));
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



};



const sendToken=(user,statusCode, res)=>{
    const token= user.getSignedToken();
    res.status(statusCode).json({success:true,token})


} 

exports.update =  async (req,res,next) =>{

    const  {avater}= req.body;
 try {
 

    await User.findOneAndUpdate({_id: req.params.id});
    avater
    res.json({msg: "update success"});

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
 };