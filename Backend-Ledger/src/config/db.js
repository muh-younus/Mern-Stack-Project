const mongoose = require('mongoose')

async function connectDB(){

    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Mongodb connected Successfully!")
    })
    .catch((error)=>{
        console.log("Mongodb connection Failed")
        console.log(error)
    })
}

module.exports = connectDB