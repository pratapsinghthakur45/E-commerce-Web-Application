import express from 'express';
import  {signup}  from '../controllers/userControllers.js';
import  {login}  from '../controllers/userControllers.js';
import  {profile}  from '../controllers/userControllers.js';
import  {updateProfile}  from '../controllers/userControllers.js';
import  {changePassword}  from '../controllers/userControllers.js';
import jwtAuth from '../middlewares/jwtAuth.js';
const router = express.Router();

// Signup route
router.post('/signup', signup);

//Login route
router.post('/login',login);

//user profile
router.get('/profile',jwtAuth,profile);

//
router.put('/profile',jwtAuth,updateProfile)

//
router.put('/profile/password',jwtAuth,changePassword);

export default router;
