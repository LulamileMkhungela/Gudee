const mongoose = require ('mongoose')

const Schema = mongoose.Schema;

const singleFileSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    isbnNnumber: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    numberOfItems: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileSize: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('SingleFile', singleFileSchema);