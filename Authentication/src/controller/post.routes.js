const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const userModel = require('../model/user.model')



router.post('/create',async (req,res)=>{

    const token = req.cookies.myToken

    

    if(!token){

        return res.status(401).json({   
            message:'Unauthorized user'
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModel.findOne({
            _id: decoded.id
        })
        console.log("the user is:",user)
    }catch(err){
        return res.status(401).json({
            message:'Invalid token'
        })
    }

    

    
})

module.exports = router

