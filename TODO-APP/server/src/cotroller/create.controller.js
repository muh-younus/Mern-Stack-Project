const modelTodo = require('../model/todo.model')
const mongoose = require('mongoose')
const {asyncHandler} = require('../middleware/asyncHandler')

const createTodo = asyncHandler(async (req,res)=>{

        const {title, description} = req.body;
        console.log(title,description)

        if(!title || title.trim() ===""){

            return res.status(400).json({

                success: false,
                message: "Title is required"

            });
        }
        const newTodo = await modelTodo.create({

            title,
            description
        })
        console.log("newtodo",newTodo)

        return res.status(201).json({
            success: true,
            message: "Todo create successfully",
            newTodo
        })

   
      

})

const gettodo = asyncHandler(async (req,res)=>{

    

        const {search, sort, page=1,limit=20 } =req.query

        //Base query
        let query = {};
        if(search){
            query.title = {$regex: search, $options: "i"}
        }

        //sorting
        let sortOption = {}
        if(sort === "asc") sortOption.createAt = 1;
        else sortOption.createAt = -1;

        //pagination
        const skip = (page - 1 ) * limit;

        const todos = await modelTodo.find(query).sort(sortOption).skip(skip).limit(parseInt(limit))
        const totalTodos= await modelTodo.countDocuments(query)

        return res.status(200).json({
            success: true,
            message: "todo fetched sucessfull",
            total: totalTodos,
            page: Number(page),
            limit: Number(limit),
            data: todos
        })



})

const getById = asyncHandler(async (req,res)=>{

    

        const {id} = req.params
        console.log("id",id)
        
        if(!mongoose.Types.ObjectId.isValid(id)){

            return res.status(400).json({
                success: false,
                message: "invalid id",
                error: error.message
            })
        }

        const todos = await modelTodo.findById(id)
        console.log(todos)

        if(!todos){

            return res.status(404).json({
                success: false,
                message: "Todo not found"
            })
        }
        return res.status(200).json({
            data: todos,
            success: true
        })


   
})

const update = asyncHandler(async (req, res)=>{

    const {id} = req.params
    const {title,description} = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){

        return res.status(400).json({
            success: false,
            message: "invalid id"
        })
    }

    if(!title || title.trim()===""){
        return res.status(400).json({
            success: false,
            message: "Title is required"
        })
    }

    const updateTodo = await modelTodo.findByIdAndUpdate(
        id,
    {
        title,description
    },
{
    new: true
})

return res.status(200).json({
    success: true,
    message: "Todo updated successfullp",
    data: updateTodo
})


if(!updateTodo){
    return res.status(404).json({
        success: false,
        message: "Todo not found"
    })
}
})

const updatewithPatch = asyncHandler(async (req, res)=>{

    const {id} =req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success: false,
            message: "invalid id"

        })
    }

    const todo = await modelTodo.findById(id)
    if(!todo){
        return res.status(404).json({
            success: false,
            message: "Todo not found"
        })
    }
    console.log("before",todo.isCompleted)

    todo.isCompleted = !todo.isCompleted
    console.log("after", todo.isCompleted)

    await todo.save()  
    return res.status(200).json({
        success: true,
        message: "Todo updated successfully",
        data: todo
    }) 
})

const deleteTodo = asyncHandler(async (req, res)=>{

    const {todo}= req.params

    if(!mongoose.Types.ObjectId.isValid(todo)){
        return res.status(400).json({
            success: false,
            message: "id is invalid"
        })
    }

    const deleteTodo = await modelTodo.findByIdAndDelete(todo)

    return res.status(200).json({
        message: "delete todo successfully",
        deleteTodo
    })
})

module.exports = {createTodo,gettodo,getById,update,updatewithPatch,deleteTodo}