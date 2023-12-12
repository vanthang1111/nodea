import express from 'express';
import asyncHandler from "express-async-handler";
import Product from '../Models/ProductModel.js';
import {admin, protect} from'./../Middleware/AuthMiddleware.js';

const productRoute = express.Router()

//get all products
productRoute.get("/",asyncHandler(async(req,res)=>{
    //so san pham trong trang
    const pageSize = 4;
    const page = Number(req.query.pageNumber)||1;
    const keyword=req.query.keyword?{
        name:{
            $regex:req.query.keyword,
            $options:"i",
        },
    }
    :{};
    const count = await Product.countDocuments({...keyword});
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page-1)).sort({_id:-1});
    res.json({products,page,pages:Math.ceil(count/pageSize)});
}));


//admin get all product without search and pegination 
productRoute.get("/all",protect,admin,asyncHandler(async(req,res)=>{
const products = await  Product.find({}).sort({_is:-1});
res.json(products)
}));

// get single product 
productRoute.get("/:id",asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
        res.json(product);
    }
    else{
        res.status(404);
        throw new  Error("product not found");
    }
}));

//  product review
productRoute.post("/:id/review",protect,asyncHandler(async(req,res)=>{
    const{rating,comment}=req.body;
    const product = await Product.findById(req.params.id);
    if(product){
        const alreadyReviewed = product.reviews.find(
            (r)=>r.user.toString()===req.user._id.toString()
        );
        if(alreadyReviewed){
            res.status(400);
            throw new Error("product already reviewed");
        }
        const review={
            name:req.user.name,
            rating:Number(rating),
            comment,
            user:req.user._id,

        };
        product.reviews.push(review);
        product.numReviews= product.reviews.length;
        product.rating=
        product.reviews.reduce((acc,item)=> item.rating+acc,0)/
        product.reviews.length;
        await product.save();
        res.status(201).json({message:"reviewed added"});
    }
    else{
        res.status(404);
        throw new  Error("product not found");
    }
}));


// delete product 
productRoute.delete("/:id",protect,admin,asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
        // await product.remove();
        await product.deleteOne();
        
        res.json({message:"Product deleted"});
    }
    else{
        res.status(404);
        throw new  Error("product not found");
    }
}));


// create product 
productRoute.post("/",protect,admin,asyncHandler(async(req,res)=>{
    const {name,price,description,image,countInStock} = req.body;
    const productExist = await Product.findOne({name}) 
    if(productExist){
        res.status(400);
        throw new  Error("product name already exist");
    }
    else{
        const product = new Product({
            name,price,description,image,countInStock,user:req.user._id,
        });
        if(product){
          const createdProduct=await product.save();
          res.status(201).json(createdProduct);
        }
        else{
            res.status(400);
            throw new  Error("Invalid product data");
        }
        
    }
}));


// edit product 
productRoute.put("/:id",protect,admin,asyncHandler(async(req,res)=>{
    const {name,price,description,image,countInStock} = req.body;
    const product = await Product.findById(req.params.id); 
    if(product){
        product.name=name || product.name;
        product.price=price || product.price;
        product.description=description||product.description;
        product.image=image||product.image;
        product.countInStock=countInStock||product.countInStock;

        const updateProduct=await product.save();
        res.json(updateProduct);

    }
    else{
        res.status(404);
        throw new  Error(" product not found");

    
    }
}));



export default productRoute;

