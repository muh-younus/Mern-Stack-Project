const express = require("express");
const noteModel = require("./models/note.model")

const app= express()
app.use(express.json())

app.post("/notes",async(req,res)=>{

    const data = req.body

    noteModel.create({
        title: data.title,
        description: data.description,
        age: data.age

    })
    res.status(201).json({
        message: "Note created successfully"
    })
})

app.get("/notes",async(req,res)=>{

    const allNotes = await noteModel.find()

    res.status(200).json({

        message: "All notes",
        data: allNotes
    })
})

app.delete("/notes/:id",async (req,res)=>{

    const id = req.params.id

    await noteModel.findOneAndDelete({
        _id:id
    })
    res.status(200).json({
        message: "note deleted successfully"
    })
})

app.patch("/notes/:id",async(req,res)=>{

    const index = req.params.id

    const data = req.body.title
    const data2 = req.body.description
    const data3 = req.body.age

    await noteModel.findOneAndUpdate({
        _id:index
    },{
        title: data,
        description: data2,
        age: data3  
    })
})
module.exports = app