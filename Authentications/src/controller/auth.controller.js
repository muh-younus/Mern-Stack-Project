import userModel from "../model/user.model.js";
import crypto from "crypto"
import jwt from 'jsonwebtoken'

export async function register(req,res){

    const {username, email,password}= req.body;

    const isAlreadyExist = await userModel.find({

        $or: [
            {username},
            {email}
        ]
    })

    if(isAlreadyExist){

        return res.status(409).json({
            message: "username or email is aleady exist"
        })
    }

    const hashPassword = crypto.createHash("sha256").update(password).digest("hex");

    const newUser = await userModel.create({
        username,
        email,
        password:hashPassword
    })

    const token = jwt.sign({
        id: user._id
    },config.JWT_SECRET,
    {
        expiresIn:"30d"
    })

    res.status(201).json({
        message: "user create successfully",
        user:{
            username: user.username,
            email: user.email
        
        },
        token
    })


}