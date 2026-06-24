const express = require('express')
const router = express.Router();

router.use((req,res,next)=>{
    console.log("User Router time: ",Date.now())
    next();
})

router.get("/",(req,res)=>{
    res.send("user home page")
})

router.get("/:id",(req,res)=>{
    res.send(`user profile id is ${req.params.id}`)
})

module.exports = router