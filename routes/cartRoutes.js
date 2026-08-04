import express from 'express';
import jwtAuth from '../middlewares/jwtAuth.js';
import {addProductInCart,getCart,removeProduct} from '../controllers/cartControllers.js';
const router = express.Router();

//post cart 
router.post('/cart/:id',jwtAuth,addProductInCart);

//get cart
router.get('/cart',jwtAuth,getCart);

//change or update cart
router.put('/cart/:id',jwtAuth,removeProduct);

export default router;