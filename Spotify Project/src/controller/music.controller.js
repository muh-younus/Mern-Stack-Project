const musicModel = require('../model/music.model')
const jwt = require('jsonwebtoken')
const albumModel = require('../model/album.model')
const { uploadFile } = require('../service/storage.service')

async function createMusic(req, res) {

    
    
        

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
            artist: req.user.id
        })

        await music.save()

        return res.status(201).json({
            message: "Music created successfully",
            music
        })

    }

    
        
  


async function createAlbum(req,res){

    
    
        

        const {title,music} = req.body

        const album = new albumModel({

            title,
            artist: req.user.id,
            music:music
        })
        
        res.status(201).json({
            message:"Album created successfully",
            album:{

                id:album._id,
                title:album.title,
                artist:album.artist,
                music:album.music
            }
        })  

    }



module.exports = { createMusic, createAlbum }