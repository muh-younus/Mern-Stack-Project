const userModel = require('../model/user.model')
const jwt = require('jsonwebtoken')

async function register(req,res){

    const {username,email,password} = req.body;

      const userExists = await userModel.findOne({
        email
      })

      if(userExists){

        res.status(409).json({
            message: 'user exists'
        })
      }

    const users = await userModel.create({
        username,
        email,
        password
        
    })

    const token =jwt.sign({
        id:users._id,
    },process.env.JWT_SECRET)
    res.cookie('myToken',token)

    res.status(201).json({
        message:'User registered successfully',
        users
    })
}

module.exports = {register}