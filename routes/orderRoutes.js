import express from 'express';
import jwtAuth from '../middlewares/jwtAuth.js';
import {addProductInCart,getCart,removeProduct} from '../controllers/cartControllers.js';
import { placeOrder,orders ,order,adminOneOrderDetails,adminOrders, statusChange} from '../controllers/orderControllers.js';
const router = express.Router();

//post cart 
router.post('/order/:id',jwtAuth,placeOrder);

//get all orders
router.get('/orders',jwtAuth,orders);

//get one order details
router.get('/orders/:id',jwtAuth,order);

//get admin orders details
router.get('/admin/orders',jwtAuth,adminOrders);

//get admin one order details
router.get('/admin/orders/:id',jwtAuth,adminOneOrderDetails);

//status change router
router.put('/admin/orders/:id/status',jwtAuth,statusChange);

export default router;