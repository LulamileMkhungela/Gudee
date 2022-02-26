const mongoose = require('mongoose');

// mongodb connetion
module.exports = async () => {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }

        await mongoose.connect('mongodb+srv://Gudee:Addmore%40Digital@cluster0.tisxh.mongodb.net/Gudee?retryWrites=true&w=majority', connectionParams);
        console.log('Database connected successfully');
    } catch (error) {
        console.log(error);
        console.log('Could not connect to the database');
    }
}