const SellerSchema = require('../models/productUserInfo');

// Upload user information
const ProductUserInfo = async (req, res, next) => {
    try {
        const userInformation = new SellerSchema({
            title: req.body.title,
            isbnNumber: req.body.isbnNumber,
            description: req.body.description,
            condition: req.body.condition,
            price: req.body.price,
            numberOfItems: req.body.numberOfItems,
            location: req.body.location,
            paymentMethod: req.body.paymentMethod,
        });
        await userInformation.save();
        res.status(201).send('Your image has been uploaded successfully');
    } catch(error) {
        res.status(400).send(error.message);
    }
}

// Get all the single files
const getProductUserInfo = async (req, res, next) => {
    try {
        const info = await SellerSchema.find();
        res.status(200).send(info)
    } catch(error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    ProductUserInfo,
    getProductUserInfo
}