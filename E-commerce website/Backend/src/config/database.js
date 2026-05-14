import mongoose from "mongoose"
import config from "./config.js"

const databaseConnection = async ()=>{

    try{
   console.log(config.MONGODB_URL)
        await mongoose.connect(config.MONGODB_URL)
        console.log("Mongodb is connected successfully")
    }catch(error){
        console.log(  `Error connecting to mongodb ${error}`)
    }
    

}

export default databaseConnection