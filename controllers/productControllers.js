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