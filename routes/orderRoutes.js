import express from 'express';
import jwtAuth from '../middlewares/jwtAuth.js';
import {addProductInCart,getCart,removeProduct} from '../controllers/cartControllers.js';
import { placeOrder,orders ,order} from '../controllers/orderControllers.js';
const router = express.Router();

//post cart 
router.post('/order/:id',jwtAuth,placeOrder);

//get all orders
router.get('/orders',jwtAuth,orders);

//get one order details
router.get('/orders/:id',jwtAuth,order);

export default router;