const modelTodo = require('../model/todo.model')

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

module.exports = createTodo