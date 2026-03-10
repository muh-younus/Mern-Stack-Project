const express = require('express')
const router = express.Router()
const validationRule = require('../middlewares/validation.middleware')

const getData = require('../controller/get.controller')


router.get('/get',validationRule,getData)

module.exports = router