const musicModel = require('../model/music.model')
const jwt = require('jsonwebtoken')
const { uploadFile } = require('../service/storage.service')

async function createMusic(req, res) {

    console.log("Request body:", req.body)
    console.log("Request cookies:", req.cookies)
    console.log("Request file:", req.file)

    // ✅ Get token from cookies
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized - No token in cookies"
        })
    }

    try {
        // ✅ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // ✅ Check role
        if (decoded.role !== 'artist') {
            return res.status(403).json({
                message: "You are not authorized to create music"
            })
        }

        const { title } = req.body
        const file = req.file

        if (!file) {
            return res.status(400).json({
                message: "Music file is required"
            })
        }

        // ✅ Upload file
        const result = await uploadFile(file.buffer.toString('base64'))

        // ✅ Save music in DB
        const music = new musicModel({
            uri: result.url,
            title,
            artist: decoded.id
        })

        await music.save()

        return res.status(201).json({
            message: "Music created successfully",
            music
        })

    } catch (error) {
        console.log("JWT Error:", error.message)

        return res.status(401).json({
            message: "Invalid or expired token"
        })
    }
}

module.exports = { createMusic }