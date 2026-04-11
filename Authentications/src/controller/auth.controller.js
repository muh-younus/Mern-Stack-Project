import userModel from "../model/user.model.js";
import crypto from "crypto"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config/config.js';
import { decode } from "punycode";
import sessionModel from "../model/session.model.js";
import {sendEmail} from "../service/email.service.js"
import {generateOtp, getOtpHtml} from "../utils/utils.js"
import otpModel from "../model/otp.model.js";

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

    const otp = generateOtp();
    const html = getOtpHtml(otp);

    const otpHash = crypto.createHash("sha256").update(otp).digest('hex')

    await otpModel.create({
        email,
         user:newUser._id,
        otpHash
    })
    await sendEmail(email, "OTP verification", `Your OTP code is ${otp}`, html)


   
    res.status(201).json({
        message: "user Registered successfully",
        user:{
            username: newUser.username,
            email: newUser.email,
            verified: newUser.verified
        
        },
        
        

    })


}

export async function login(req,res){

    const {email,password} = req.body

    const user = await userModel.findOne({email:email})

    if(!user){

        return res.status(401).json({
            message: "Email or Password not found"
        })

    }

    if(!user.verified){
       return res.status(401).json({
        message:"Email not verified"
       }) 
    }
    const hashPassword = crypto.createHash('sha256').update(password).digest('hex')
    

    const isPasswordValid = hashPassword === user.password;

    if(!isPasswordValid){

        return res.status(401).json({

            message: "Invalid email or password"
        })
    }

    const refreshToken = jwt.sign({
        id:user.id
    },config.JWT_SECRET,
{
    expiresIn: "7d"
})

const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex')

const session = await sessionModel.create({
    user:user.id,
    refreshTokenHash,
    ip:req.ip,
    userAgent: req.header["user-agent"]
})

const accessToken = jwt.sign({
    user:user.id,
},config.JWT_SECRET,
{
    expireIn:"15m"
})

res.cookie("refreshToken",refreshToken,{

    httpOnly:true,
    secure:true,
    sameSite:"strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
})
    

    res.status(200).json({
        message: "User Login successfully"
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

    const refreshTokenHash = crypto.createHash('sha256').update('refreshToken').digest('hex')

    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false
    })
    if(!session){
        return res.status(400).json({
            message: "Refresh Token is invalid"
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

const newRefreshTokenHash = crypto.createHash('sha256').update('newRefreshToken').digest('hex')
session.refreshTokenHash = newRefreshTokenHash;
await session.save();


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

export async function logOut(req,res){

    const refreshToken = req.cookies.refreshToken

    if(!refreshToken){

        return res.status(400).json({
            message: "Refresh Token not found"
        })
    }

    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest('hex')

    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false
    })

    if(!session){

        return res.status(400).json({

            message: "Invalid Refresh Token"
        })

    }

    session.revoked = true;
    await session.save()

    res.clearCookie("refreshToken")
    res.status(200).json({
        message: "Logged out successfully"
    })
}

export async function logoutAll(req,res){

    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){

        return res.status(401).json({
            message:"Token not found"
        })
    }

    const decoded = jwt.verify(refreshToken,config.JWT_SECRET)

    await sessionModel.updateMany({
        user:decoded.id,
        revoked:false
    },{
        revoked:true
    })

    res.clearCookie("refreshToken")

    res.status(200).json({
        message:"Logout from all devices successfully"
    })
}

export async function verifyEmail(req,res){


    const {otp, email} = req.body;

    const otpHash = crypto.createHash("sha256").update(otp).digest("hex")

    const otpDoc = await otpModel.findOne({
        email,
        otpHash,
        
    })
    
    

    if(!otpDoc){
        return res.status(400).json({
            message:"Invalid OTP"
        })
    }

    

    const user = await userModel.findByIdAndUpdate(otpDoc.user,
        {verified: true},

        
        {new: true}
        
    )

    console.log("user is verified",user)

    await otpModel.deleteMany({
        user:otpDoc.user
    })

    return res.status(200).json({
        message: "Email verified successfully",
        user:{
            username: user.username,
            email:user.email,
            verified:user.verified
        }
    })


}