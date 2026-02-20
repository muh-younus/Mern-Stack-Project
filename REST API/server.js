const express = require('express');
const server = express();
const fs = require('fs')
server.use(express.json())

const data = JSON.parse(fs.readFileSync('data.json','utf-8'))

// Today task - create CRUD operations

server.get('/product',(req,res)=>{

    res.json(data)
})
// Get-param :- calling
server.get('/product/:id',(req,res)=>{

    const index = +req.params.id;
    const product = data.products.find(p => p.id === index)

    res.json(product)
})

// Create-request

server.post('/product',(req,res)=>{

    console.log(req.body)
    data.push(req.body)
    res.json(req.body)
})

// Update-data
server.put('/product/:id',(res,req)=>{
const id = req.params.id;

const productIndex = data.products.findIndex(p=>p.id === id)
data.products.splice(productIndex,1,{...req.body, id:id})

})

// Start server
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
