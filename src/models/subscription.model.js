import mongoose from "mongoose";

const subscription=new mongoose.Schema({
   subscriber:{
    type:mongoose.Schema.ObjectId,
    ref:"User"

   },
   channel:{
    type:mongoose.Schema.ObjectId,
    ref:"User"
   }
   
},{timestamps:true})

export const Subscription=mongoose.model("subscription",subscription)