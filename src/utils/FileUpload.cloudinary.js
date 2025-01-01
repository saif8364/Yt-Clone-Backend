import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

 ()=> {

    // Configuration
    cloudinary.config({ 
        cloud_name: dgfdwnwdu, 
        api_key: process.env.Cloudinary_Api_Key, 
        api_secret:process.env.Cloudinary_Api_Secret // Click 'View API Keys' above to copy your API secret
    })};

    async function Upload_File(file_path)
    {
        try{
            if (!file_path) return null;
            cloudinary.v2.uploader.upload(file_path,{resource_type:"auto"},(error,result) => {
                console.log(result);
               cout<<"File uploaded Successfully";
              }
              )
        }
        catch(error)
        {
            console.log("Failed to Upload File Error : ",error)
            fs.unlinkSync(file_path);
            return null;
           
        }
    }

    export default Upload_File
   

    