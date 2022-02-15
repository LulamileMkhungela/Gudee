const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    cellphone: {
        type: String,
    },
    altCellphone: {
        type: String,
    },
    homeAddress: {
        type: String,
    },
    radio: {
        type: String,
    }
});

module.exports = mongoose.model('profile', profileSchema);