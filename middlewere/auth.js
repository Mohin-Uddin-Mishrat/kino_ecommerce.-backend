const userMoodels = require("../models/userModels");
const catchAsyncError = require("./catchAsyncError");
const errorHandeler = require("./errorHandelr");
const jwt = require('jsonwebtoken');

exports.isAuthenticated = catchAsyncError(async (req, res, next)=>{
    const { token } = req.cookies;
    console.log(token);


    if(!token){
        console.log("token");
        return next(new errorHandeler("please login first to enter this resource",400))
    }
    const decodedData = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = await userMoodels.findById({_id:decodedData.id});
    next();
})

exports.authorizeRole =catchAsyncError(async(req,res,next)=>{
    if(req.user.role==="admin"){
        next()
    }else{
        next(new errorHandeler("this resourse is secure, Only admin can access",500));
    }
})