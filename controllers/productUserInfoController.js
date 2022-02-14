const sellerSchema = require('../models/productUserInfo');

// Upload user information
const productUserInfo = (req, res, next) => {
    const userInformation = new sellerSchema({
            selects: req.body.selects,
            title: req.body.title,
            isbn: req.body.isbn,
            description: req.body.description,
            condition: req.body.condition,
            price: req.body.price,
            items: req.body.items,
            location: req.body.location,
            payment: req.body.payment,
    });
    try {
        userInformation.save();
        res.status(201).send('You successfully inserted your information');
    } catch(error) {
        res.status(400).send(error.message);
    }
}

// Get all the single files
const getProductUserInfo = async (req, res, next) => {
    try {
        const info = await sellerSchema.findOne();
        res.status(200).send(info)
    } catch(error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    productUserInfo,
    getProductUserInfo
}