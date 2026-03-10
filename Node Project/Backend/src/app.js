const server = require('express')
const multer = require('multer')
const uploadImage = require('./service/storage.service')
const model = require('./model/post.model')
const cors = require('cors')
const app = server()

//middleware
app.use(server.json())
app.use(cors())
const upload = multer({storage:multer.memoryStorage()})

app.post('/post', upload.single("image"),async (req,res) =>{

    
    const result = await uploadImage(req.file.buffer) 
    model.create({
        image: result.url,
        caption: req.body.caption
    })
    res.status(201).json({
        message: "Post created successfully",
        data: result.url,
        caption: req.body.caption


    })
})

app.get('/posts', async (req,res) =>{

    const posts = await model.find({

    })
    res.status(200).json({
        message: "Posts retrieved successfully",
        data: posts
    })
})


module.exports = app