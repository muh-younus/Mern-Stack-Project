require('dotenv').config()
const express = require('express')
const route = require('./routes/routes')
const {errorHandler} = require("./middleware/error.middleware")
const app =express()

app.use(express.json())
app.use("/todo",route)
app.use(errorHandler)


module.exports = app