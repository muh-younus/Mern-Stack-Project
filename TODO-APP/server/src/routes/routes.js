const express = require('express')
const {createTodo,gettodo,getById,update,updatewithPatch,deleteTodo} = require('../cotroller/create.controller')
const routes =express.Router()

routes.get("/",(req,res)=>{
    res.send("hello")
})

routes.post('/add',createTodo)
routes.get('/get',gettodo)
routes.get('/get/:id',getById)
routes.put('/update/:id',update)
routes.patch('/:id/toggle',updatewithPatch)
routes.delete('/:todo/delete',deleteTodo)

module.exports=routes