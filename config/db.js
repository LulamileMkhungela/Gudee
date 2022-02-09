const mongoose = require('mongoose');

// mongodb connetion
module.exports = () => {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }

        mongoose.connect('mongodb://localhost:27017/Gude', connectionParams);
        console.log('Database connected successfully');
    } catch (error) {
        console.log(error);
        console.log('Could not connect to the database');
    }
}