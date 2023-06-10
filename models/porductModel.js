const mongoose = require('mongoose');
const productSchama = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product name"],
    },
    description:{
        type:String,
        required:[true,"please enter product description"],
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true,
        
    },
    title:{
        type:String,
        required:[true,"please enter product title"],
    },
    rating:{
        type:Number,
        default:0
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    stock:{
        type:Number,
        required:true,
        default:1
    },
    reviews:
        [
            {
                user:{
                    type:mongoose.Schema.ObjectId,
                    required:true
                },
                name:{
                    type:String,
                    required:true
                },
                rating:{
                    type:Number,
                    required:true
                },
                comment:{
                    type:String,
                    required:true
                }
            },
            
        ],
    user:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    createdAt:{
            type:Date,
            default:Date.now
        }
})

 const Productmodel = mongoose.model('Product',productSchama);

 module.exports=Productmodel