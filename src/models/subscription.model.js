import mongoose from "mongoose";

const subscription=new mongoose.Schema({
   subscriber:{
    type:mongoose.Schema.ObjectId,

   },
   channel:{
    type:mongoose.Schema.ObjectId,
   }
   
},{timestamps:true})

export const Subscription=mongoose.model("subscription",subscription)