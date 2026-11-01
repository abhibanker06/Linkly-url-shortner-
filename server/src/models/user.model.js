import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    shortUrl:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ShortUrl"
    }]
})

userSchema.index({email:1},{unique:true});

export default mongoose.model('User', userSchema);