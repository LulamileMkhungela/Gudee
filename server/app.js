const express = require('express');
const app = express();
/*
    Import Routes Middlewares
 */
const authRoute = require('./routes/authenticate/authRoute')

/*
    Import Morgan For Detailed Request Info
 */
const morgan = require('morgan')
app.use(morgan('dev'))


/*
    Connect To Database Using Mongoose
 */

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Gudee:<password>@cluster0.tisxh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {},err => {
    
})

/*
    Execute Routes Middlewares
 */
app.use('/auth', authRoute)

module.exports = app