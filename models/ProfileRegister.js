const mongoose = require('mongoose')


const ReqistrationSchema = new mongoose.Schema({

    image: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },


    lastname: {
        type: String,
        required: true
    },
    studentemail: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    Alternativenumber: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }

})
module.exports = mongoose.model('Profile', RegistrationSchema)