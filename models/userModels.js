const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,"please enter your name plese"],
        minLength:[3,"Name should have more than 3 charecter"],
        maxLength:[30,"Name cannot exceed 30 charecter"]
    },
    email:{
        type:String,
        unique: [true , "please enter uniqe name"],
        required: [true,"please enter your name plese"],
        validate:[validator.isEmail, "please enter valid email"]
    },
    password:{
        type:String,
        minLength:[8, "Password should have more than 7 charecter"],
        select: true,
        required: [true,"Please enter your password"]
    },
    image:{
        url:{
            type:String,
            required:true
        },
        publicId:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resePasswordToken:String,
    resetExpiredate:Date

})

userSchema.pre("save",async function (next){
    if(!this.isModified("password")){
        next();
    }
    this.password= await bcrypt.hash(this.password,10);
})

userSchema.methods.getJwtToken=function (){
    return jwt.sign({id:this._id},process.env.JWT_TOKEN,{expiresIn:process.env.JWT_EXPIRE});
}
userSchema.methods.comparePassword=async function (givenPassword){
    return await bcrypt.compare(givenPassword,this.password);
}
userSchema.methods.getResetToken= function (){
    const resetToken  = crypto.randomBytes(20).toString("hex");
    this.resePasswordToken= crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetExpiredate=  Date.now()+15*60*1000;
    return resetToken
}



const userMoodels = mongoose.model("User", userSchema);
module.exports =userMoodels