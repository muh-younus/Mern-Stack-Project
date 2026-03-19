const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userData = new mongoose.Schema({

    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})
//hash password before saving
userData.pre('save', async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password.toString(),10)
    }
    
})

//Method to compare password during login
userData.methods.comparePassword = async function(password){
    return await bcrypt.compare(password.toString(), this.password)
}

const userModel = mongoose.model("user",userData)
module.exports = userModel