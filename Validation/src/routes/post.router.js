const express=require('express')
const router = express.Router()
const postData = require('../controller/post.controller')
const validationRule = require('../middlewares/validation.middleware')


router.post('/post',validationRule,postData)

module.exports = router