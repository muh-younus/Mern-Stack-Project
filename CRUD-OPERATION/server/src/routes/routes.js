const express = require('express')
const {postRequest,getRequest,updateRequest,deleteRequest,login }= require('../controller/post.controller')
const router = express.Router()



router.post("/login",login)
router.post("/post-req",postRequest)
router.get("/get-req",getRequest)
router.put("/update-req/:id",updateRequest)
router.delete("/delete-req/:index",deleteRequest)

module.exports= router