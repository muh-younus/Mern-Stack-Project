const express = require('express')
const cookieParser=require('cookie-parser')
const routes = require("./routes/routes")
const app = express()

//middleware-parse json data into javascript object
app.use(express.json())
app.use(cookieParser())


app.use("/data",routes)

module.exports = app