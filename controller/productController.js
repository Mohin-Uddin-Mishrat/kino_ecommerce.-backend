const Product= require("../models/porductModel");
const catchAsyncError = require("../middlewere/catchAsyncError");
const { query } = require("express");
const apifeatures = require("../utils/apiFeature");
const errorHandeler = require("../middlewere/errorHandelr");
const { findByIdAndUpdate } = require("../models/userModels");

exports.getAllProducts= catchAsyncError(async(req,res, next)=>{
  const resultperPage = 5;
  const apifeature = new apifeatures(Product.find(),req.query).search().filter().pagination(resultperPage);
  const products = await apifeature.query;
    res.status(201).json({
      success: true,
      products
    })
})

exports.creatProduct = catchAsyncError(async(req,res, next)=>{
    const {
       name,
       category,
       price,
       title,
       description,
       stock
  }=req.body;
    const product = await Product.create({
      name,
      category,
      price,
      title,
      description,
      stock,
      user:req.user._id
    });
    res.status(201).json({
      success:true,
      product
    })
  })
exports.productDetails = catchAsyncError(async(req,res, next)=>{
  const product =await Product.findById(req.params.id);
  if(!product){
    return next(new errorHandeler("product not found",404));
  }
  
    res.status(201).json({
      success:true,
      product
    })
  })

exports.deleteProduct = catchAsyncError(async(req,res, next)=>{
  const pdt =await Product.findById(req.params.id);

  if(!pdt){
    return next(new errorHandeler("product not found",404));
  }

  const product = await Product.findByIdAndRemove(req.params.id);

  res.status(201).json({
      success:true,
      message:"Product delete successsfully",
      product
    })
  })
exports.updateProduct = catchAsyncError(async(req,res, next)=>{
  const pdt =await Product.findById(req.params.id);

  if(!pdt){
    return next(new errorHandeler("product not found",404));
  }

   const product = await Product.findByIdAndUpdate(req.params.id, req.body)

  res.status(201).json({
      success:true,
      message:"product Updated Successfully",
      product
    })
  })
exports.getAllreviews = catchAsyncError(async(req,res, next)=>{
  const product =await Product.findById(req.query.id);

  if(!product){
    return next(new errorHandeler("product not found",404));
  }


  res.status(201).json({
      success:true,
      message:"product Updated Successfully",
      reviews:product.reviews
    })
  })

exports.deleteReview = catchAsyncError(async(req,res, next)=>{
  const product =await Product.findById(req.query.id);
   
  if(!product){
    return next(new errorHandeler("product not found",404));
  }
   
  const Reviews = product.reviews.filter(rev=> rev.user.toString()!==req.user._id.toString());

  const numOfReviews = Reviews.length;
   let avg=0 ;

   Reviews.forEach(rev => {
       avg=avg+rev.rating;
   })
   const rating =0 ;
   if(numOfReviews.length===0){
    rating =0;
   }else{
    rating= avg/numOfReviews;
   }

   const update = await Product.findByIdAndUpdate(req.query.productId,{
     numOfReviews,
     rating,
     Reviews

   })


  
  res.status(201).json({
      success:true,
      message:"product delete successfully",
      reviews:update
    })
  })
exports.creatReview = catchAsyncError(async(req,res, next)=>{

  const {productId, comment, rating}= req.body;
  const review ={
    name:req.user.name,
    user:req.user._id,
    comment,
    rating:Number(rating)
  }
  const product =await Product.findById(productId);

  if(!product){
    return next(new errorHandeler("product not found",404));
  }

  const isreviewed= product.reviews.find(rev=> rev.user.toString() === req.user._id.toString())
  
  if(isreviewed){
    product.reviews.forEach(element => {
      if(element.user.toString()===req.user._id.toString()){
        element.comment= comment
        element.rating=rating
      }
    });
  }else{
    product.reviews.push(review)
    product.numOfReviews= product.reviews.length;
  }

 
  let avg = 0 ;
   
  product.reviews.forEach(rev =>  avg= avg+rev.rating);

  product.rating=  avg/product.reviews.length;

  await product.save({validateBeforeSave:true});
  res.status(201).json({
      success:true,
      message:"review created successfully",
    })
  })

  