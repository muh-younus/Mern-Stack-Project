import userModel from "../model/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import config from "../config/config.js"

//signup
export async function signupUser(req,res){
    
   try{
    const {name, email,password} = req.body

    const userExist = await userModel.findOne({email})
    

    if(userExist){
        res.status(400).json({
            message: "User already exist "
        })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        name,
        email,
        password: hashPassword
    })

    res.status(201).json({
        message: "User registered successfully",
        user
    })
}catch(error){
    res.status(500).json({
        message:"Error in signup",
        error:error.message 
    })
}
}

//login
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    console.log(req.body);

    const user = await userModel.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      config.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "User login successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}