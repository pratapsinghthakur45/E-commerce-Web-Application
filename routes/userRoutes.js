import express from 'express';
import  {signup}  from '../controllers/userControllers.js';
import  {login}  from '../controllers/userControllers.js';

const router = express.Router();

// Signup route
router.post('/signup', signup);

//Login route
router.post('/login',login);

export default router;
