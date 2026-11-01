import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({
    fullUrl:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    clicks:{
        type:Number,
        default:0,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
})

// shortUrlSchema.index({shortUrl:1},{unique:true}); we can also create index and unique like this

const shortUrl = mongoose.model('ShortUrl',shortUrlSchema);
export default shortUrl;