const express = require('express') //import from npm 
const app = express() //To create and instance or to initialize the express
const port = 8080; //our app will run on port 8080

//To create a route that send or receive data

app.get('/',(req,res)=>{
    res.send("hello Younus, You working good work")
})

//start the server
app.listen(port,()=>{
console.log(`App listening at http://localhost:${port}`)
})