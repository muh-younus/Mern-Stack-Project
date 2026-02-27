const express = require('express')
const app = express()
require('dotenv').config()
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const postRoutes = require('./controller/post.routes')



app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRoutes)
app.use('/api/auth',postRoutes)


module.exports = app