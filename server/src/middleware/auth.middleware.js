import jwt from "jsonwebtoken";
import User  from "../models/user.model.js";

export const authenticateUser= async(req , res , next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"Unauthorized access, please login first"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(401).json({
                message:"User not found, please register first"
            })
        }

        req.user= user;
        next();

    }catch(error){
        res.status(500).json({
            message:"Error authenticating user",
            error:error.message
        })
    }
}