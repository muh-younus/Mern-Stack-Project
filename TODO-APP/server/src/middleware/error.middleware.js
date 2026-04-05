const errorHandler = (err,req,res,next)=>{
    console.error("error",err.message)

    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
        success: false,
        message:err.message || "internal server error"
    })
}

module.exports = {errorHandler}