const userModel = require('../model/spotfy.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    const userExists = await userModel.findOne({ 
        $or:[
            {username: req.body.username},
            {email: req.body.email}
        ]
     })
     
    if (userExists) {
        return res.status(400).json({
            message: 'Username or email already exists'
        })
    }

    try {
        const { username, email, password, role="user" } = req.body
        const hash = await bcrypt.hash(password,10)
        const user = new userModel(
            { username, email, password: hash, role }
        )
        await user.save()

         // Generate JWT token
        const token = jwt.sign({
            id: user._id,
            role: user.role
        },process.env.JWT_SECRET)
        // Set token in cookie
        res.cookie('token', token)

        res.status(201).json({
            message: 'User registered successfully',
            user:{
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })


    }
     
    catch (error) {
        res.status(400).json(
            { message: error.message }
        )
    }
}

const login = async (req, res) => {

    const {username,email,password} = req.body

    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if (!user) {
        return res.status(400).json({
            message: 'Invalid username or email'
        })
    }

    const passwordMatch = await bcrypt.compare(password,user.password)
    if (!passwordMatch) {
        return res.status(400).json({
            message: 'Invalid password'
        })
    }

        // Generate JWT token
        const token = jwt.sign({
            id: user._id,
            role:user.role
        },process.env.JWT_SECRET)

        // Set token in cookie
        res.cookie('token', token)

        res.status(200).json({
            message: 'Login successful',
            user:{
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })
    

}

const getUser = async (req, res) => {
    try{

        const users = await userModel.find()
        res.status(200).json({
            message: 'Users retrieved successfully',
            users
        })
    }catch(error){
        res.status(400).json(
            { message: "error user not found"}
        )
    }
}

module.exports = { register,login }   