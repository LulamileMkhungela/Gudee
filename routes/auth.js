const router = require("express").Router();

const Users = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../controllers/sendMail');


// Register
router.post("/register", async (req, res, next) => {

        try {
            const {firstname, lastname, email, password} = req.body

            if (!firstname || !lastname || !email || !password)
                return res.status(400).json({success: false, error: "provide all fields"})

            if (!validateEmail(email))
                return res.status(400).json({success: false, error: "provide vaild email"})

            const user = await Users.findOne({email})
            if (user) return res.status(400).json({success: false, error: "This email already exists."})

            if (password.length < 6)
                return res.status(400).json({success: false, error: "Password must be at least 6 characters."})

            const passwordHash = await bcrypt.hash(password, 12)

          
                const newUser = new Users({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: passwordHash,
                  });
            

            // const activation_token = createActivationToken(newUser)

            // const url = `${CLIENT_URL}/user/activate/${activation_token}`
            // sendMail(email, url, "Verify your email address")


            const users = await newUser.save();

            res.json({success: true, users: "Register Success! you can noe login"})
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }

   
});
//Login
router.post("/login", async (req, res, next) => {
try {
            const {email, password} = req.body
            if (!email || !password)
                return res.status(400).json({success: false, error: "provide all fields"})

            const user = await Users.findOne({email})
            if (!user) return res.status(400).json({success: false, error: "This email does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({success: false, error: "Password is incorrect."})

            const refresh_token = createRefreshToken({id: user._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            })

            res.json({success: true, users: "Login success!"})
        } catch (error) {
            console.log(error);
            // return res.status(500).json({success: false, error: error})
        }




    

});
//Forgot password

router.post("/forgotpassword", async (req, res, next) => {

    const {email} = req.body;
    try {
        if (!email) {
            res.status(400).json({success: false, error: "Please provide email field"})
        }
        const user = await Users.findOne({email})
        if (!user) return res.status(400).json({success: false, error: "This email does not exist."})

        const resetToken = user.getResetPasswordToken()

        await user.save();
        const reseturl = `http://localhost:3000/passwordreset/${resetToken}`;

        const message = `<h1> You have requested a password reset </h1>
                        <p> Please go to this link to reset your password </p>
                        <a href=${reseturl} clicktracking = off>${reseturl}  </a>`
        try {
            await sendEmail({
                to: user.email,
                subject: "Email reset passord",
                text: messages
            });
            res.status(200).json({success: true, data: "email sent"})

        } catch (error) {
            user.getResetPasswordToken = undefined;
            user.getResetPasswordExpire = undefined;

            await user.save();
            return res.status(400).json({success: false, error: "This email does not exist."})
        }
    } catch (error) {
        next(error);
    }

});
// reset password
router.post("/resetpassword", async (req, res, next) => {

    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {$gt: Date.now()}
        })
        if (!user) {

            return res.status(400).json({success: false, error: "invalid Reset Token ,400"});
        }
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        res.status(200).json({
            success: true,
            data: "password reset Success"
        })

    } catch (error) {
        next(error)
    }


});

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({success: true, token})


}
//update user profile

router.post("/update", async (req, res, next) => {

    const {avater} = req.body;
    try {


        await Users.findOneAndUpdate({_id: req.params.id});
        avater
        res.json({success: true, data: "update  success"});

        //  const user= await User.create({

        //      firstname,lastname,email,password
        //  });
        //  sendToken(user,200,res);


    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });

    }
});

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

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