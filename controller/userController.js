const catchAsyncError = require("../middlewere/catchAsyncError");
const ErrorHandeler = require("../middlewere/errorHandelr");
const User = require("../models/userModels");
const { SendEmail } = require("../utils/sendEmail");
const sendTokEN = require("../utils/sendToken");

exports.createUser= catchAsyncError(async(req,res, next)=>{
    const {name, password, email}= req.body;
    const userCreate = await User.create({
            name,
            password,
            email,
            image:{
                url:"this is url",
                publicId:"this is public id"
            }
        })
    
    sendTokEN(userCreate, 201,res)
})
exports.loginUser= catchAsyncError(async(req,res, next)=>{
    const {password, email}= req.body;
    if(!email || !password){
        return next(new ErrorHandeler("Please enter email and password",400))
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandeler("Invalid email and password",401))
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandeler("You entered invalid password",400))

    }



    
    sendTokEN(user, 201,res)
})

exports.logout= catchAsyncError(async(req,res, next)=>{
    
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
    res.status(201).json({
        message: " logged out "
    })
})
exports.forgetPassword= catchAsyncError(async(req,res, next)=>{
     const {email}= req.body;
    const user= await User.findOne({email});

    if(!email){
        return next(new ErrorHandeler("User not found"));
    }
    const resetToken = user.getResetToken();
    const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;
  console.log(resetPasswordUrl);

   const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it`

   try{

      await SendEmail({
        email:user.email,
        subject:"Reset password",
        message
      })


   }catch(error){
     user.resePasswordToken= undefined;
     user.resetExpiredate=undefined;
     return next(new ErrorHandeler(error.message, 500))
   }
})

