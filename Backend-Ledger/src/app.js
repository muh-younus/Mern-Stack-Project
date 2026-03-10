const express = require('express')
const app = express()
/**
 * Routes
 */
const authRoutes = require("./routes/auth.routes")
const accountRoute = require('./routes/account.routes')
const cookieParser = require("cookie-parser")



/**
 * Middleware
 */
app.use(express.json())
app.use(cookieParser())

/**
 * use Routes
 */
app.use("/api/auth",authRoutes)
app.use("/api/account",accountRoute)




module.exports = app