module.exports= (err,req,res,next)=>{
    err.message=err.message || "internala server error";
    err.statusCode= err.statusCode || 500;
    res.status(err.statusCode).json({
        success:false,
        error:err.message
    })
}