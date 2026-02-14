import bcrypt from 'bcrypt';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

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