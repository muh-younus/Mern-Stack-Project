import Cart from "../model/cart.model.js"

//add items into cart
export const addToCart = async (req, res)=>{
    try{

        const {userId, productId } = req.body;
        

        let cart = await Cart.findOne({userId});
        

        if(!cart){
            cart = new Cart({
                userId,
                items: [
                    {productId,quantity:1}
                ]
            })
            await cart.save();   // 🔥 important
             
             return res.json({
                message: "item added successfully"
             })

        }else{
            const item = cart.items.find(
                i=> i.productId.toString() === productId
            )
            console.log("items", item)
            if(item){
                item.quantity += 1;
            }else{
                cart.items.push({productId, quantity: 1})
            }

            await cart.save();
            res.json({
                message: "item added to cart successfully",
                cart
            })

        }


    }catch(error){
        return res.status(500).json({
            message: "internal server error",error
        })

    }
}

//remove items from cart
export const removeItem = async (req,res)=>{

    try{
        const {userId,productId} = req.body;
        const cart = await Cart.findOne({userId});

        if(!cart){

        return res.status(404).json({
            message: 'cart not found'
        })
        }

        //remove the product from items
        cart.items = cart.items.filter(
            i=>i.productId.toString()!==productId
        )
        await cart.save();
        res.json({
            message: "Item removed from cart"
        })

    }catch(error){

        res.status(500).json({
            message: 'Server Error',error
        })
    }
}

//Update item quantity in cart
export const updateQuantity = async (req,res)=>{
    try{
    const {userId,productId,quantity}= req.body;
    
    const cart = await Cart.findOne({userId})
   

    if(!cart){
        return res.status(404).json({
            message: "cart not founded"
        })
    }
    const item = cart.items.find(
        i=>i.productId.toString() === productId
    )
    

    if(!item){
        res.status(404).json({
            message: 'server Error',error
        })
    }
    item.quantity = quantity
    return res.json({
        message: "update successfull",
        item
    })
}catch(error){
    res.status(500).json({
        message: 'server error',error
    })
}
}

export const getCart = async (req,res)=>{
    try{
        const {userId} = req.params;
        

        const cart = await Cart.findOne({userId}).populate('items.productId')
        console.log("param",userId)
        console.log("cart",cart)
        res.json(cart);

    }catch(err){
 res.status(500).json({
    message: 'server error',err
 })
    }
}