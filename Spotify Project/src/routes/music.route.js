const express = require('express')
const router = express.Router()
const musicController = require('../controller/music.controller')
const multer = require('multer')
const authMiddleware = require("../middleware/auth.middleware")



const upload = multer({
    storage: multer.memoryStorage()
})
router.post('/upload',authMiddleware.authArtist, upload.single('file'), musicController.createMusic)
router.post('/album',authMiddleware.authArtist,musicController.createAlbum)
router.get('/',authMiddleware.authUser,musicController.getMusic)

module.exports = router