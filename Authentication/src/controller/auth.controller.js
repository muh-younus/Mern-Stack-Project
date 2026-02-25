const userModel = require('../model/user.model')
const jwt = require('jsonwebtoken')

async function register(req,res){

    const {username,email,password} = req.body;

    const users = await userModel.create({
        username,
        email,
        password
        
    })

    const token =jwt.sign({
        id:users._id,
    },process.env.JWT_SECRET)

    res.status(201).json({
        message:'User registered successfully',
        token,
        users
    })
}

module.exports = {register}