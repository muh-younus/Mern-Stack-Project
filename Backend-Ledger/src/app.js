const express = require('express')
const app = express()
const mongoDB = require('./config/db')

mongoDB()


module.exports = app