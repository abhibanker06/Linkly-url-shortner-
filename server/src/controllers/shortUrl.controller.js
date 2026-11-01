import urlSchema from "../models/shortUrl.modle.js";
import User from "../models/user.model.js";
import {nanoid} from 'nanoid';

export const generateShortUrl= async(req,res)=>{
    try{
        const id = req.user.id;

        const {url} = req.body;
        const shortUrlCode= nanoid(7);

        const newUrl= await urlSchema.create({
            fullUrl:url,
            shortUrl:shortUrlCode,
            user:id
        })

        await User.findByIdAndUpdate(id,{$push:{shortUrl:newUrl._id}});

        res.status(200).json({
            message:"Short URL generated successfully",
            shortUrl:newUrl
        });
    }catch(error){
        res.status(500).json({message:error.message});
    }
} 

export const getShortUrl= async(req,res)=>{
    try{
        const {URL} = req.params;
        const foundUrl= await urlSchema.findOne({shortUrl:URL});
        if(foundUrl){
            res.redirect(foundUrl.fullUrl);
        }else{
            res.status(404).json({message:"Short URL not found"});
        }
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

