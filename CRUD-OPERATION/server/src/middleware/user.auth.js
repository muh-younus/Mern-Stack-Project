const jwt = require('jsonwebtoken')

function authMiddleware(req,res,next){

    //Get token from header
    try{
        const token = req.cookies.token;
        console.log("The is token is",token)
        
       
        if(!token){
            res.status(401).json({
                message: "Token not found"
            })
        }

        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        req.user = decoded
        console.log("the req.user is",req.user)

        next()
    

    }catch{
     
        return res.status(401).json({
            message: "invalid user"
        })
    }

    


}

module.exports=authMiddleware





/**
 * 
 * const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    try {
        // get token from header
        const token = req.headers.authorization

        if (!token) {
            return res.status(401).json({
                message: "No token, login first"
            })
        }

        // remove "Bearer "
        const cleanToken = token.split(" ")[1]

        // verify token
        const decoded = jwt.verify(cleanToken, process.env.SECRET_KEY)

        // save user id in request
        req.user = decoded

        next() // go to next function
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports = authMiddleware
 */