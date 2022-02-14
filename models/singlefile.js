const mongoose = require ('mongoose')
const Schema = mongoose.Schema;

const singleFileSchema = new Schema({ 
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
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'students'
    }
}, {timestamps: true});

const userInfoSchema = new Schema({

})

module.exports = mongoose.model('product-image', singleFileSchema);