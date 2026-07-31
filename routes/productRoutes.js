import express from 'express';
import {addProduct, getAllProducts} from '../controllers/productControllers.js';
import { updateProduct } from '../controllers/productControllers.js';
import { deleteProduct } from '../controllers/productControllers.js';
import { getProducts } from '../controllers/productControllers.js';
import jwtAuth from '../middlewares/jwtAuth.js';
const router = express.Router();


//add product
router.post('/products',jwtAuth,addProduct);

//update product
router.put('/products/:id',jwtAuth,updateProduct);

//delete product
router.delete('/products/:id',jwtAuth,deleteProduct);

//get product
router.get('/products/:id',jwtAuth,getProducts);

//get all products
router.get('/products',jwtAuth,getAllProducts);

export default router;


