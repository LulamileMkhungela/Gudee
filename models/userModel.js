const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    lastname: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    location: {
        type: String,
        default: null,
    },
    phonenumber: {
        type: Number,
        default: 0
    },
    Altnumber: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"]
    },
    avatar: {
        type: String,
        default: null
    }
}, {
    timestamps: true
})
module.exports = mongoose.model("student", userSchema)