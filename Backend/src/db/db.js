const mongoose = require('mongoose')

async function connectDB(){
try{
    await mongoose.connect(
  "mongodb://127.0.0.1:27017/myDB"
  
);
console.log("connected to databases")
}catch(err){
    console.error("not connect",err)
    process.exit(1)     
}
}
module.exports = connectDB