import AsyncHandler from "../utils/asynhandler.js"
import apiError from "../utils/errorHandler.js";
import  connection from "../db/connection.js"
import { User } from "../models/user.model.js";
import Upload_File from "../utils/FileUpload.cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import bcrypt from "bcrypt"


const RegisterUser=AsyncHandler(
  async  (req,res) => {
    const {username,email,FullName,Password}=req.body
    //validation for empty fields
    console.log("validating empty fields done");
    if (username === "" || email === "" || FullName === "" || Password === "") {
      
      throw new apiError(500, "All Fields Are Required");
    }
    
    
 //check if user already exists

 console.log("checking if username already existed/.......");
     const isFound= await User.findOne({
        $or:[{username},{email}]
        })

        if(isFound)
        {
          
           throw new apiError (409,"email ,username already existed");
        }

  //check if files 
  
 
    
   const avatar_path= req.files?.avatar[0]?.path;
const cover_path= req.files?.cover[0]?.path;

 console.log("Avatar PAth: ",avatar_path," Cover image Path: ",cover_path);

//checking if avatar_path got the url
  if(!avatar_path)
    {   
        throw new apiError(500,"Avatar required")
    }
    console.log("avatar path is getted");
//uploading file to cloudinary
     
    const Avatar=await Upload_File(avatar_path);
    console.log(Avatar);
     const Cover= await Upload_File(cover_path); 
     console.log(Cover);
    //again checking if avatar is uploaded or not as its a  required field
    if(!Avatar) 
      {
        throw new apiError(500,"Avatar not Found or avatar not uploaded");
      }
      console.log("pic uploded to Cloudinary");


      //noe saving data to db

     const user=await User.create({
        username:username.toLowerCase(),FullName,Password,email,avatar:Avatar.url,cover:Cover?.url || ""
      })
      
// hm checking if data is saved?

    const CreatedUser= await User.findById(user._id).select(
      "-Password -RefreshToken" //here the password and refresh token isnt stored
    )

    if(!CreatedUser)
     {
      throw new apiError(500,"Problem while Regestring User")
     }
     console.log("user entry done");

//giving Response
console.log(CreatedUser);
    return res.status(200).json(
      new ApiResponse(200,CreatedUser,"User Registered Successfuly")
    )

    })


  const LoginUser=AsyncHandler(
    async(req,res) => {
      
      const {username,Password,email}=req.body;
      console.log(req.body);
      console.log(username,Password,email);
      if(!username || !email && !Password)
        {
          throw new apiError(500,"Fields are Required")
        }
        

        const user = await User.findOne({
          $or:[{username},{email}]
        } );

        if(!user)
          {
            throw new apiError(400,"user or email not found ")
          }

         const Hashed= await user.isPasswordCorrect(Password);
         if(!Hashed)
          {
            throw new apiError(300,"iNCORRECT pASSWORD");
          }
         
          //now saving refresh token to db anad access token to cookies
         const access_token= user.Generate_Access_Token();
         const refresh_token=user.Generate_Refresh_Token();
          user.RefreshToken=refresh_token;
         await user.save({validateBeforeSave:false})

         //as we dont wnt to spoil our password etc
         const loggedInUser=await User.findById(user._id).select("-Password -RefreshToken")


          const options={
            secure:true,
            httpOnly:true
          }
          
          
         return res.status(200)
         .cookie("AccessToken",`${access_token}`,options)
         .cookie("RefreshToken",`${refresh_token}`,options)
         .json(new ApiResponse(200,user,"User LOgged In Suceessfully"));
            
    })


    const LogoutUser=AsyncHandler(
      async (req,res)=>{
           //now heres the prob we dont habv the credentials of the usser who logged in nor his ID or email etc so here we use miidleware of our own
         await  User.findByIdAndUpdate(req.user._id,{
              $set:{RefreshToken:undefined,}
            })


           const options={
            secure:true,
            httpOnly:true
          }

          return res.status(200)
          .clearCookie("AccessToken",options)
          .clearCookie("RefreshToken",options)
          .json(new ApiResponse(200,"","User Logged Out Successfully"))
      }
    )


export   {RegisterUser,LoginUser,LogoutUser}
 