const express = require('express');
const authController = require('../controller/auth.controller') 
const router = express.Router()

router.post('/register',authController.register)

router.get('/check',(req,res)=>{
res.json({
    message:'Token is valid',
    cookies: req.cookies
})
})

module.exports = router