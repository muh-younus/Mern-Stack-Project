require('dotenv').config()
const app =require("./src/app")

const database = require("./src/db/db")


database()

app.listen(3000,()=>{
    console.log("server is running")
})