const {kMaxLength} = require("buffer");
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        category: {
            type: String,
            required: true,
        },
        product_img_url: {
            type: String,
            required: true
        },
        isbn: {
            type: Number,
            default: null
        },
        imei: {
            type: Number,
            default: null
        },
        title: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true,
        },
        condition: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        location: {
            type: String,
            required: true
        },
        payment_method: {
            type: String,
            required: true
        },
        _user_id: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Product', ProductSchema);