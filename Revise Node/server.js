const express = require('express')
const userRouter = require('./routes/user.js')
const productRouter = require('./routes/product.js')
const app = express()
const port = 8080

app.use(express.json())
app.use(express.static('./public'))
// app.use(express.urlencoded({extended:true}))

app.use('/users',userRouter)
app.use('/product',productRouter)



app.listen(port,(req,res)=>{
    console.log(`The app is running  http://localhost:${port}`)
})