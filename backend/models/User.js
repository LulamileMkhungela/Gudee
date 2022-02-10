const crypto = require('crypto'); 
const mongoose = require ('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const UserSchema = new mongoose.Schema({
firstname:{
       type:String,
       required:[true, "please provide firstname"]
},
lastname:{
       type:String,
       required:[true, "please provide lastname"]
},
email:{
    type:String,
    required:[true, "please provide  email address "],
    unique:true,
    
},
password:{
    type:String,
    required:[true, "please provide a password"],
    minlength:6,
    select:false
},
resetPasswordToken:{
    type:String
},
resetPasswordExpire:{
    type:Date
},


date:{
    type:Date,
    default:Date.now
}


})


UserSchema.pre("save", async function(next){
    if(!this.isModified("password")){
    next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt);
    next();
});

UserSchema.methods.matchPasswords = async function(password){
    return await bcrypt.compare(password,this.password)
}

UserSchema.methods.getSignedToken= function(){

    return  jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })

}

UserSchema.methods.getResetPasswordToken = function() {
const resetToken = crypto.randomBytes(20).toString("hex");
this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

return resetToken; 
}


module.exports= mongoose.model('loginUsers',UserSchema)