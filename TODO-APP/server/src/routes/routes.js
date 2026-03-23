const express = require('express')
const createController = require('../cotroller/create.controller')
const routes =express.Router()

routes.get("/",(req,res)=>{
    res.send("hello")
})

routes.post('/add',createController)

module.exports=routes