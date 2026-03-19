const express = require('express')
const authMiddleware=require("../middleware/user.auth")
const {postRequest,getRequest,updateRequest,deleteRequest,login }= require('../controller/post.controller')
const router = express.Router()



router.post("/login",login)
router.post("/post-req",postRequest)
router.get("/get-req",getRequest)
router.put("/update-req/:id",authMiddleware,updateRequest)
router.delete("/delete-req/:index",authMiddleware,deleteRequest)

module.exports= router