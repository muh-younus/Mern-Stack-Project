const modelTodo = require('../model/todo.model')
const mongoose = require('mongoose')

const createTodo = async (req,res)=>{

    try{

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

    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })

    }

}

const gettodo = async (req,res)=>{

    try{

        const {search, sort, page=1,limit=5 } =req.query

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

        const todos = await modelTodo.find(query)
        .sort(sortOption).skip(skip)
        .limit(parseInt(limit))
        const totalTodos= await modelTodo.countDocuments(query)

        return res.status(200).json({
            success: true,
            message: "todo fetched sucessfull",
            total: totalTodos,
            page: Number(page),
            limit: Number(limit),
            data: todos
        })

    }catch(err){

        return res.status(500).json({
            success: false,
            message: "internal server error",
            error: err.message
        })

    }


}

const getById = async (req,res)=>{

    try{

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


    }catch(error){
        return res.status(500).json({

            message: "internal server error",
            error: error.message,
            success: false
        })
    }
}

module.exports = {createTodo,gettodo,getById}