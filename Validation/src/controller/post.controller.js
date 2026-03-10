function postRequest(req,res){
    const {username,email,password} = req.body
     res.status(200).json({
        message: "User registered successfully",
        data: { username, email,password }
    });


}

module.exports= postRequest