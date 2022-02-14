const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')
const {google} = require('googleapis')
const {OAuth2} = google.auth
//const fetch = require('node-fetch')

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const {CLIENT_URL} = process.env

const userCtrl = {
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

            const newUser = {
                firstname, lastname, email, password: passwordHash
            }

            const activation_token = createActivationToken(newUser)

            const url = `${CLIENT_URL}/user/activate/${activation_token}`
            sendMail(email, url, "Verify your email address")


            res.json({success: true, data: "Register Success! Please activate your email to start."})
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    },
    activateEmail: async (req, res) => {
        try {
            const {activation_token} = req.body
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

            const {firstname, lastname, email, password} = user

            const check = await Users.findOne({email})
            if (check) return res.status(400).json({success: false, error: "This email already exists."})

            const newUser = new Users({
                firstname, lastname, email, password
            })

            await newUser.save()

            res.json({success: true, data: "Account has been activated! u can now sell on Gude"})

        } catch (error) {
            return res.status(500).json({success: false, error: "email not sent"})
        }
    },
    login: async (req, res) => {
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

            res.json({success: true, data: "Login success!"})
        } catch (error) {
            return res.status(500).json({success: false, error: error})
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
            res.json({msg: "Re-send the password, please check your email."})
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
    getUsersAllInfor: async (req, res) => {
        try {
            const users = await Users.find().select('-password')

            res.json(users)
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
    updateUser: async (req, res) => {
        try {
            const {name, avatar} = req.body
            await Users.findOneAndUpdate({_id: req.user.id}, {
                name, avatar
            })

            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUsersRole: async (req, res) => {
        try {
            const {role} = req.body

            await Users.findOneAndUpdate({_id: req.params.id}, {
                role
            })

            res.json({success: true, data: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteUser: async (req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id)

            res.json({success: true, data: "Deleted Success!"})
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

module.exports = userCtrl