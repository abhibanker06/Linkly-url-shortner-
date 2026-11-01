import User from "../models/user.model.js";

export const getUserDetails= async(req,res)=>{
    try{
        const id = req.user._id;
        const user = await User.findById(id).populate('shortUrl');
        if(user){
            res.status(200).json({
                message:"User details fetched successfully",
                user
            });
        }else{
            res.status(404).json({message:"User not found"});
        }
    }catch(error){
        res.status(500).json({message:error.message});
    }
}