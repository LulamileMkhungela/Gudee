const Users = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')
// const {google} = require('googleapis')




const loginUserCtrl = {
    register: async (req, res) => {

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
            

            
                  

          const userinfo= await newUser.save();

           res.status(200).json(userinfo);
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    },
   //login
    login: async (req, res) => {
        try {
            const {email, password} = req.body
            if (!email || !password)
                return res.status(400).json({success: false, error: "provide all fields"})

            const user = await Users.findOne({email:email}).select('+password');
console.log(user);
            if (!user) return res.status(400).json({success: false, error: "This email does not exist."})
            
            const isMatch = await bcrypt.compare(req.body.password,user.password)
           console.log(password);
            if (!isMatch) return res.status(400).json({success: false, error: "Password is incorrect."})

            const payload = createRefreshToken({id: user._id, })
           
            const token = jwt.sign(payload,process.env.SECRET_TOKEN,{expireIn:"1d"});

            res.json({token})
        } catch (error) {
            // return res.status(500).json({success: false, error: error})
            console.log(error);
        }
    },
    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if (!rf_token) return res.status(400).json({msg: "Please login now!"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({success: false, error: "Please login now!"})

                const access_token = createAccessToken({id: user.id})
                res.json({access_token})
            })
        } catch (error) {
            return res.status(500).json({success: false, error: error})
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const {email} = req.body
            const user = await Users.findOne({email})
          
            if (!user) return res.status(400).json({success: false, error: "This email does not exist."})

            const access_token = createAccessToken({id: user._id})
            const url = `${CLIENT_URL}/user/reset/${access_token}`

            sendMail(email, url, "Reset your password")
            res.json({success:true,data: "Re-send the password, please check your email."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    resetPassword: async (req, res) => {
        try {
            const {password} = req.body
            console.log(password)
            const passwordHash = await bcrypt.hash(password, 12)

            await Users.findOneAndUpdate({_id: req.user.id}, {
                password: passwordHash
            })

            res.json({success: true, data: "Password successfully changed!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUserInfor: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')

            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
   
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg: "Logged out."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    
    

}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}


module.exports = loginUserCtrl