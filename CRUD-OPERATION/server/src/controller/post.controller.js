const User = require("../model/user.model")
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

async function login(req,res){

    const {email, password} = req.body

    if(!email || !password){
        res.status(400).json({
            message: "Send email and password"
        })
    }
    //find email and password in db
    const user = await User.findOne({email})
    console.log(user)
    if(!user){

        return res.status(401).json({
            message: "invalid credential"
        })
    }

    //compare password
    const isMatch = await user.comparePassword(password)
    console.log("match",isMatch)
    if(!isMatch){return res.status(401).json({message: "Not match credential"})}

    const token = jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:"1h"});
    res.cookie('token',token)
    res.json({
        token,
        email,
        password
    })

}

async function postRequest(req, res){

const {email,password} = req.body

if(!email || !password){
    return res.send("send both email and password")
}

try{

    const user = new User({
        email,
        password
    
    })
    user.save()
    res.status(201).send(
    {
        email,
        password
    })
}catch(err){

}
}

async function getRequest(req,res){

    try{
        const user = await User.find();
        res.json(user)
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

async function updateRequest(req,res){

    
  const id = req.params.id.trim(); // pfurqe8909
  console.log(id)
  const { email, password } = req.body;
  console.log(email,password)

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({
        message: "invalid objectId"
    })
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { email, password },
      { new: true } // returns updated data
    );
   
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

}

async function deleteRequest(req,res){

    const id=req.params.index.trim();

    try{
        await User.findByIdAndDelete(id)
        return res.status(200).json({
            message: "Data deleted successfully"
        })
    }catch(err){
        console.log(err)

    }
}

module.exports = {
    postRequest,
    getRequest,
    updateRequest,
    deleteRequest,
    login
};