const profileSchema = require('../models/ProfileSchema');
const userSchema = require('../models/userModel');

// upload profile Schema
const uploadProfile = async (req, res, next) => {
    try {
        const newProfile = new profileSchema({
            cellphone: req.body.cellphone,
            altCellphone: req.body.altCellphone,
            homeAddress: req.body.homeAddress,
            radio: req.body.radio,
        });
        await newProfile.save();
        res.status(201).send('Your profile has been uploaded');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// retrieve profile schema
const getProfile = async (req, res, next) => {
    try {
        const user = await profileSchema.find(); //Array of Objects
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    uploadProfile,
    getProfile
}