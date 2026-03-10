const express = require('express')
const app = express()
const getRoute = require("./routes/get.route")
const postRoute = require("./routes/post.router")
app.use(express.json())

app.use('/api/receive',getRoute);
app.use('/api/send',postRoute)



module.exports=app