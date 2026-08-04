import express from 'express';
import dotenv from 'dotenv';
import db from './db.js';
//this is config function call for use of .env file
dotenv.config();
const app = express();

//this work as similar as body-parser
app.use(express.json());

//user routes import
import userRoutes from "./routes/userRoutes.js";

//product routes import
import productRoutes from "./routes/productRoutes.js";

//cart routes import
import cartRoutes from "./routes/cartRoutes.js";

app.get('/',(req,res)=>{
    res.send("E-Commerce Platform");
});

//user routes
app.use('/user',userRoutes);

//product routes
app.use('/user',productRoutes);

//cart routes
app.use('/user',cartRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("server is running on https://localhost:3000");
})