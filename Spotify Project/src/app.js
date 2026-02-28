const express = require('express')
const app = express()
const registerRoute = require('./routes/register.route')
const musicRoute = require('./routes/music.route')  
app.use(express.json())
app.use('/api/auth',registerRoute)
app.use('/api/music',musicRoute)


module.exports = app