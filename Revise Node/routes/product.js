const express = require('express')
const router = express()

router.get('/',(req,res)=>{
    res.send("Product List")
})

router.get('/:id',(req,res)=>{
    res.send(`product detail id is ${req.params.id}`)
})

module.exports =router