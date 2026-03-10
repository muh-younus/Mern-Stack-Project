const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const validator = require('validator')

const userSchema =new mongoose.Schema({

    email:{
        type: String,
        required:[true,"Email is required for creating an account"],
        trim:true,//no space
        lowercase: true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid Email Address"],
        unique: [true,"Email already Exists"]
    },

    name:{
        type: String,
        required: [true, "Name is required for creating an account"],
        
    },

    password:{
        type: String,
        required: [true,"Password is required for creating an account"],
        minlenght: [3,"password should be greater than 6 character or digit"],
        select: false
    }
},{
    timestamps: true// when user create or update
})


userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()

    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash  // ✅ assign correctly
    
})

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password,this.password)
}

const userModel = mongoose.model("user",userSchema)
module.exports = userModel
