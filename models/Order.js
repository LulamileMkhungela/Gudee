const mongoose = require('mongoose')


const OrderSchema = new mongoose.Schema({

    UserID: {
        type: String,
        required: true,
        unique: true
    },
    Product: [{
        ProductId: {
            type: String,
        },
        quantity: {
            type: number,
            default: 1
        }
    }],
    amount: {
        type: number,
        required: true,
    },
    Address: {
        type: Object,
        required: true,
    },
    status: {
        type: string,
        default: "pending"
    },

    date: {
        type: Date,
        default: Date.now
    }

})
module.exports = mongoose.model('Orders', Orderchema)