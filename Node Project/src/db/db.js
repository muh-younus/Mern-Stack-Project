const mongoose = require('mongoose')


async function  connectDB() {

    try{
await mongoose.connect('mongodb://localhost:27017/NodeProject')
console.log('Connected to MongoDB')

    }catch(err){
        console.log(err)
    }
 

    

}

module.exports = connectDB

