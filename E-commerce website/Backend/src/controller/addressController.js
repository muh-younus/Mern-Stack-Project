
import Address from "../model/address.js"

//create address
export const saveAddress = async (req,res)=>{

    try{

        const address = await Address.create(req.body)
        res.status(201).json({
            message: 'Address save successfully, address',
            address
        })

    }catch(err){
        res.status(500).json({
            message: "Error saving address", error
        })
    }
}

//Get address by user id
export const getAddress = async (req, res)=>{

    try{

        const addresses = await Address.find({
            userId: req.params.userId
        })

        res.json(addresses)

    }catch(error){
        res.status(500).json({
            message: "Error fetching address",error
        })
    }
}