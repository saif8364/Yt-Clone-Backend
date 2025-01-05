import { User } from "../models/user.model.js";
import AsyncHandler from "../utils/asynhandler.js";
import apiError from "../utils/errorHandler.js";
import jwt from "jsonwebtoken"

const VerifyJWT=AsyncHandler(
    async(req,res,next)=>{
        
    try {
        
        const token=req.cookies.AccessToken
        
        if(!token)
            {
                throw new apiError(400,"unAuthorized Access");
            }
            console.log(token);
           const decodedToken=  jwt.verify(token,process.env.Access_Token_Secret)
           if(!decodedToken)
            {
                throw new apiError(400,"unAuthorized Access");
            }
           const user=await User.findById(decodedToken?._id).select("-Password -RefreshToken")
    
           if(!user)
            {
                throw new apiError(401,"Invalid Access Token ")
            }
    
    
            req.user=user;
            next();
    } catch (error) {
        throw new apiError(401,error?.message||"invalid Access Token")
    }

    }
)



export default VerifyJWT;