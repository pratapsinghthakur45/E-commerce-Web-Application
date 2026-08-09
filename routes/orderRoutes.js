import express from 'express';
import jwtAuth from '../middlewares/jwtAuth.js';
import {addProductInCart,getCart,removeProduct} from '../controllers/cartControllers.js';
import { placeOrder,orders } from '../controllers/orderControllers.js';
const router = express.Router();

//post cart 
router.post('/order/:id',jwtAuth,placeOrder);

//get all orders
router.get('/orders',jwtAuth,orders);

export default router;