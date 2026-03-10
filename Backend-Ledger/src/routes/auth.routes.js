const express = require('express')
const router = express.Router()
const authController = require('../controller/auth.controller')


router.post("/registers",authController.userRegisterController)
router.post("/login",authController.userLoginController)

module.exports = router