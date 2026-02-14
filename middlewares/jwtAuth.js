import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const jwtAuth = (req,res,next) => {
     const authHeader = req.headers.authrization;

     if(!authHeader){
        return res.status(401).json({message:'Token Missing'});
     }

     const token = authHeader.split(" ")[1];

     try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded; // {id , role}
        next();
     } catch (error) {
        return res.status(401).json({message: "Invalid missing"});
     }
}

export default jwtAuth;