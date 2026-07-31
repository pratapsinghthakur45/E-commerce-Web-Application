import bcrypt from 'bcrypt';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Product from '../models/product.js';

//product add
export const addProduct = async (req,res) =>{
    try {
        const data = req.user;
        

        const userFind = await User.findOne({email:data.email});

        if(!userFind){
            return res.status(404).json({message:"User Does not exist:"});
        }

        

        if(data.role !== 'admin'){
            return res.status(403).json({message:"Only admin role can add product:"});
        }

        const product = req.body;
        
        const newProduct = new Product(product);

        const response = await newProduct.save();

        res.status(200).json({message:"Product added successfully:",product:response});


        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

//Update or Change Product Details
export const updateProduct = async (req,res) =>{
    try {
        const data = req.user;

        const user = await User.findOne({email:data.email});

        if(!user){
            return res.status(404).json({message:"User not exist"})
        }

        if(data.role !== 'admin'){
            return res.status(403).json({message:"user does not have access"});
        }

        const updatedData = req.body;

        const productId = req.params.id;

        const response = await Product.findByIdAndUpdate(productId,updatedData,{
            new:true,
            runValidators:true
        });

        if(!response){
            return res.status(404).json({message:"Product not fount"});
        }

       return res.status(200).json({message:"product updated successfully :",product:response});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}

//delete product 
export const deleteProduct = async (req,res) =>{
    try {
        if(req.user.role !== 'admin'){
            return res.status(403).json({message:"Only admin can delete products:"});
        }

        const productId = req.params.id;

        const response = await Product.findByIdAndDelete(productId);

        if(!response){
            return res.status(404).json({message:"Product Not Found"});
        }

        return res.status(200).json({message:"Product deleted successfully:"});


    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error:"});
    }
}

//get product
export const getProducts = async (req,res)=>{
    try {
        if(!req.user){
            return res.status(401).json({message:"unauthorized:"});
        }
        const productId = req.params.id;

        const product = await Product.findById(productId);

        if(!product){
            return res.status(404).json({message:"Product Not Found:"});
        }

        return res.status(200).json({message:"Product fetched successfully:",product});


    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error:"});
    }
}

//get all product
export const getAllProducts = async (req,res)=>{
    try {
        if(!req.user){
            return res.status(401).json({message:"unauthorized:"});
        }

        const products = await Product.find();
        

        return res.status(200).json({message:"All Products fetched successfully:",counts: products.length ,products:products});


    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error:"});
    }
}