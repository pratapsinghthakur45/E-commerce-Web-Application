import bcrypt from 'bcrypt';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from "node:crypto";
import OTP from '../models/otp.js';

// SIGNUP CONTROLLER
 export const signup = async (req, res) => {
  try {
    const data = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    data.password = await bcrypt.hash(data.password, 10);

    const newUser = new User(data);

    // save user
    const response = await newUser.save();

    // create JWT token
    const token = jwt.sign(
      {
        id: response._id,
        role: response.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: response,
      token: token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Login Controller
export const login = async (req,res) => {
    try {
        const {email , password} = req.body;

        const user = await User.findOne({email:email});
        if(!user){
            return res.status(401).json({message:"Email Not Exist Or Wrong"});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid Password"});
        }

        const token = jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        );

        res.json({
         message: "Login successful",
         token: token
        });

    } catch (error) {
        res.status(500).json({
          message: "Login failed",
          error: error.message
        });
    }
};

//Login With OTP
export const loginWithOTP = async (req,res) =>{
     try {
       const {email,phoneNo} = req.body;//extract email or phone number

       const user = await User.findOne({$or:[{email:email},{mobileNo:phoneNo}]});//check user exist or not with this phone number or email

       //if user does not exist then return message
       if(!user){
          return res.status(404).json({message: "Wrong Emial Or Phone Number"});
       }

       const otp = crypto.randomInt(100000,1000000);

       // hash otp
       const hashedOTP = await bcrypt.hash(String(otp),10);

       


       const newOtp = new OTP({email,otp: hashedOTP});

       const response = await newOtp.save();//store otp

       







     } catch (error) {
         res.status(500).json({message:"Login Failed"});
     }
}

//user profile data
export const profile = async (req,res) =>{
   try{
        const userData = req.user;
        const userId = userData.id;
        const user = await User.findById(userId);
        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const updateProfile = async (req,res) =>{
   try {
          const userData = req.user;
          const userId = userData.id;
          const user = await User.findById(userId);
          if(!user){
             return res.status(404).json({message:"user not found or not exist"});
          }
          const data = req.body;
            
           

          // update user data
          const response = await User.findByIdAndUpdate(userId,data,{
              new:true,//data updated
              runValidators:true,
          });
          res.status(200).json({response:response});

   } catch (error) {
         res.status(500).json({message:"Internal server error"});
   }
}



export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;

    const { currentPassword, newPassword } = req.body;

    // check required
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Both passwords are required",
      });
    }

    // find user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // compare current password
    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid current password",
      });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password updated successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Password not updated",
    });
  }
};
