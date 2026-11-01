import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken, setAuthCookie } from "../utils/auth.utils.js";


export const registerUser= async(req , res)=>{
    try{
        const{name,email,password}= req.body; 

        const user=await User.findOne({email})
        if(user){
            return res.status(400).json({
                message:"User already exists, please login instead"
            })
        }
        
        const hashedPassword= await bcrypt.hash(password,10);
        
        const newUser= await User.create({
            name,
            email,
            password:hashedPassword
        })

        const token= generateToken(newUser);

        setAuthCookie(res, token);

        res.status(201).json({
            User:{
                id:newUser._id,
                name:newUser.name,
                email:newUser.email
            },
            message:"User registered successfully",
        })

    } catch (error) {
        res.status(500).json({
            message:"Error registering user",
            error:error.message
        })
    }

}

export const loginUser= async(req,res)=>{
    try{
        const{email,password}= req.body;

        const user= await User.findOne({email}).select("+password");
        if(!user){
            return res.status(400).json({
                message:"User not found, please register first"
            })
        }

        const isPasswordValid= await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }

        const token= generateToken(user);

        setAuthCookie(res, token);

        res.status(200).json({
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            },
            message:"User logged in successfully",
        })

    } catch (error) {
        res.status(500).json({
            message:"Error logging in user",
            error:error.message
        })
    }
}

export const logoutUser= async(_req,res)=>{
    try{
        res.clearCookie("token",{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV==="production"?"none":"lax",
        });

        res.status(200).json({
            message:"User logged out successfully"
        });
        
    }catch(error){
        res.status(500).json({
            message:"Error logging out user",
            error:error.message
        })
    }   
}