import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const UserSchema= new mongoose.Schema(
    {
       watchHistory:[
        {
            type:mongoose.Schema.Types.ObjectId,  ref:"video" 
           }
       ],
       username:{
        type:String , required:true, unique:true,trim:true,lowercase:true,index:true  //here index optimize searching

       },
       email:{
        type:String, unique:true, required:true,trim:true,
       },
       FullName:{
        type:String ,required:true,index:true,trim:true,
       },
       Password:{
        type:String, required:[true,"password is required"],
       },
       avatar:{
        type:String,    //coz its stores the string url ..as we use cloudinary url
        required:true,
       },
       cover:{
         type:String, 
       },
       RefreshToken:{
          type:String,
       }

    },{timestamps:true}
)


UserSchema.pre("save",async function (next){
    if(this.isModified("Password"))
        {
        this.Password= await bcrypt.hash(this.Password,10);      //password encrypting ....10 here is salt ..so more saltrund more secure
        }
    next();
  
})

UserSchema.methods.isPasswordCorrect=async function(password)
{
   return await  bcrypt.compare(password,this.Password)
}

UserSchema.methods.Generate_Access_Token= function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            FullName:this.FullName,
            username:this.username
        },
        process.env.Access_Token_Secret,
        {
             expiresIn:process.env.Access_Token_Expiry,
        }
    )
}
UserSchema.methods.Generate_Refresh_Token=function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.Refresh_Token_Secret,
        {
             expiresIn:process.env.Refresh_Token_Expiry,
        }
    )
}

export const User=mongoose.model("User",UserSchema)