const server = require('express')
const multer = require('multer')
const uploadImage = require('./service/storage.service')
// const model = require('./model/post.model')

const app = server()

//middleware
app.use(server.json())
const upload = multer({storage:multer.memoryStorage()})

app.post('/post', upload.single("image"),async (req,res) =>{

    console.log(req.body)
    console.log(req.file)
    const result = await uploadImage(req.file.buffer)
    console.log(result)
})


module.exports = app