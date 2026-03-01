const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const registerRoute = require('./routes/register.route')
const musicRoute = require('./routes/music.route')  
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',registerRoute)
app.use('/api/music',musicRoute)


module.exports = app