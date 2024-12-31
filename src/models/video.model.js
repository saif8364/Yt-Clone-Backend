import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const VideoShema=new mongoose.Schema({
    videoFile:{
        type:String,required:true
    },
    Thumbnail:{
        type:String,required:true, 
    },
    Owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    Title:{
        type:String, required:true 
    },
    Description:{
        type:String, required:true
    },
    Duration:{
     type:Number, 
    },
    Views:{
        type:Number,default:0
    },
    isPublished:{
        type:Boolean,
        default:true,
    }
},{timestamps:true})

VideoShema.plugin(mongooseAggregatePaginate);

export const Video=mongoose.model("Video",VideoShema)