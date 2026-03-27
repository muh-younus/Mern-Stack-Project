const express = require('express')
const {createTodo,gettodo,getById} = require('../cotroller/create.controller')
const routes =express.Router()

routes.get("/",(req,res)=>{
    res.send("hello")
})

routes.post('/add',createTodo)
routes.get('/get',gettodo)
routes.get('/get/:id',getById)

module.exports=routes