require('dotenv').config()
const express = require('express')
const route = require('./routes/routes')
const app =express()

app.use(express.json())
app.use("/todo",route)


module.exports = app