import userModel from "../model/user.model.js";
import crypto from "crypto"
import jwt from 'jsonwebtoken'
import config from '../config/config.js';
import { decode } from "punycode";
import sessionModel from "../model/session.model.js";

export async function register(req,res){

    const {username, email,password}= req.body;

    const isAlreadyExist = await userModel.find({

        $or: [
            {username},
            {email}
        ]
    })

    if(isAlreadyExist.length>0){

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

    const refreshToken = jwt.sign({
        id: newUser._id
    },config.JWT_SECRET,
    {
        expiresIn:"7d"
    })

    const refTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    const session = await sessionModel.create({
        user:newUser._id,
        refreshTokenHash:refTokenHash,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
    })

    const client = await sessionModel.findOne({user:session.user})
    console.log("client",client)



    const accessToken = jwt.sign({
        id: newUser._id,
        sessionId:session._id
    },config.JWT_SECRET,
    {
        expiresIn:"1m"
    })

    

    res.cookie("refreshToken",refreshToken,{

        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 *60 * 60 * 1000
    })

    res.status(201).json({
        message: "user create successfully",
        user:{
            username: newUser.username,
            email: newUser.email
        
        },
        accessToken,
        refreshToken

    })


}

export async function getMe(req,res){

    const token = req.headers.authorization?.split(" ")[1]
    console.log("token",token)
    if(!token){

        return res.status(401).json({
            message: "token is not found"
        })
    }
    const decoded = jwt.verify(token,config.JWT_SECRET)
    console.log("decoded is",decoded)
    
    const user = await userModel.findById(decoded.id)
    console.log("user is ",user)

    if(!user){

        return res.status(404).json({
            message: "user not found"
        })
    }

    return res.status(200).json({
        message: "user fetched successfully",
        username: user.username,
        email: user.email
    })
    
}

export async function refreshToken(req,res){

    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){

        return res.status(401).json({
            message: "Refresh token not found"
        })
    }
 
    const decoded = jwt.verify(refreshToken,config.JWT_SECRET)
   const accessToken =jwt.sign({
    id:decoded.id,
   },config.JWT_SECRET,
{
    expiresIn: "14m"
})

const newRefreshToken = jwt.sign({
    id: decoded.id
},config.JWT_SECRET,
{
    expiresIn: "6d"
})

res.cookie("refreshToken",newRefreshToken,{
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 *60 * 60 * 60 * 1000
})
res.status(200).json({
    message: "Access token refreshed successfully",
    accessToken
})
}