import AsyncHandler from "../utils/asynhandler.js"
import apiError from "../utils/errorHandler.js";
import  connection from "../db/connection.js"
import { User } from "../models/user.model.js";
import Upload_File from "../utils/FileUpload.cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";

const RegisterUser=AsyncHandler(
  async  (req,res) => {
    const {username,email,FullName,Password}=req.body
    //validation for empty fields
    if (username === "" || email === "" || FullName === "" || Password === "") {
      throw new apiError(500, "All Fields Are Required");
    }
    
    
 //check if user already exists


     const isFound= await User.findOne({
        $or:[{username},{email}]
        })

        if(isFound)
        {
           cout<<"Email or Username already In Use";
           throw new apiError (409,"email ,username already existed");
        }

  //check if files 
    
  const avatar_local_path=req.files?.avatar[0]?.path;
  const cover_img_local_path=req.files?.Cover_Image[0]?.path;

  if(!avatar_local_path)
    {
        throw new apiError(500,"Avatar required")

    }

//uploading file to cloudinary
    const avatar=await Upload_File(avatar_local_path); const cover= await Upload_File(cover_img_local_path); 
    //again checking if avatar is uploaded or not as its a  required field
    if(!avatar)
      {
        throw new apiError(500,"Avatar not Found or avatar not uploaded");
      }


      //noe saving data to db

     const user=await User.create({
        username:username.toLowerCase(),FullName,Password,email,avatar:avatar.url,cover:cover?.url || ""
      })
// hm checking if data is saved?

    const CreatedUser= await User.findById(user._id).select(
      "-Password -RefreshToken" //here the password and refresh token isnt stored
    )

    if(!CreatedUser)
     {
      throw new apiError(500,"Problem while Regestring User")
     }

//giving Response
    return res.status(200).json(
      new ApiResponse(200,CreatedUser,"User Registered Successfuly")
    )

    })

   
   
    
    


    


export default RegisterUser