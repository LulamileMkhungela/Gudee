const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
    selects: {
        type: String,
        //required: false
    },
    title: {
        type: String,
        //required: false
    },
    isbn: {
        type: String,
        //required: false
    },
    description: {
        type: String,
        //required: false
    },
    condition: {
        type: String,
        //required: false
    },
    price: {
        type: String,
        //required: false
    },
    items: {
        type: String,
        //required: false
    },
    location: {
        type: String,
        //required: false
    },
    payment: {
        type: String,
        //required: false
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'students'
    }
}, {timestamps: true});

module.exports = mongoose.model('seller', sellerSchema);