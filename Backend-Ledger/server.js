require('dotenv').config()
const app = require("./src/app")
const mongoDB = require('./src/config/db')

mongoDB()

app.listen(process.env.PORT,"0.0.0.0",()=>{

    console.log("Your server is running on port",process.env.PORT)
})