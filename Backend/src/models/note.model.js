const mongoose = require("mongoose")


//schemas
const noteSchema = new mongoose.Schema({

    title: String,
    description: String,
    age: Number
})

//models

const noteModel = mongoose.model("note",noteSchema)

module.exports = noteModel