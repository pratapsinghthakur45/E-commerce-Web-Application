import express from 'express';
import {addProduct} from '../controllers/productControllers.js';
import jwtAuth from '../middlewares/jwtAuth.js';
const router = express.Router();


//add product
router.post('/Product',jwtAuth,addProduct);


export default router;


