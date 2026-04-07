import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "Username is required"]
       
    },
    email:{
        type: String,
        requred: [true, "Email is required"],
        unique: [true, "Email must be required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
})

const userModel = mongoose.model("users",userSchema)

export default userModel