const userModel = require('../model/user.model')
const jwt = require('jsonwebtoken')
const emailService = require("../service/email.service")

//user-registration
async function userRegisterController(req,res){
    const {name,email,password} = req.body
    console.log(name,email,password)

    const isExist = await userModel.findOne({email:email})
    if(isExist){
        return res.status(422).json({
            message: "user already exists with email",
            status: "failed"

        })
    }

    const user =await userModel.create({
        email,name,password
    })
    

    res.status(201).json({
        message: "user create successfully",
        user: {
            email: user.email,
            name:user.name,
            password: user.password
        }
    })
    await emailService.sendRegisterationEmail(user.email,user.name)

    const token = jwt.sign({userId: user._id},process.env.JWT_SECRET)
    console.log("token",token)
    res.cookie("jwtToken",token)
    res.json({message:"User created"})



}
//login-user
async function userLoginController(req,res){

    const {email,password} = req.body
    const user = await userModel.findOne({email}).select("+password")
    console.log(user)
    if(!user){
        return res.status(401).json({
            message: "Email or password is Invalid"
        })
    }

    const isValidPassword = await user.comparePassword(password)
    if(!isValidPassword){

         return res.status(401).json({
            message: "Email or password is Invalid"
        })

    }

    const token = jwt.sign({userId: user._id},process.env.JWT_SECRET,)
    res.cookie("token",token)
    res.status(200).json({
        message: "User login successfull!",
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        }
    })

}

module.exports = {userRegisterController,userLoginController}