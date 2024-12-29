import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connection=async () => {
  try
  {
  let connection_object= await  mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
  console.log("mongodb connected...",connection_object.Connection)
  }
  catch(error){
  console.log("Error : ",error)
  process.exit(1);
  
  }
}

export  default connection;
