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
    Execute Routes Middlewares
 */
app.use('/auth', authRoute)

module.exports = app