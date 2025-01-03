import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import dotenv from "dotenv"
import path from 'path';

dotenv.config();

// Configure Cloudinary using environment variables (recommended)
cloudinary.config({
  cloud_name: process.env.Cloudinary_Name,
  api_key: process.env.Cloudinary_Api_Key,
  api_secret: process.env.Cloudinary_Api_Secret
});

// Function to upload file
 async function Upload_File(file_path) {
    // Checking if Cloudinary is initialized properly

  
    if (!cloudinary ) {
        throw new Error('Cloudinary is not initialized properly.');
    }

    try {
        console.log("File Uploading.....",file_path);
            const response = await cloudinary.uploader.upload(file_path, { resource_type: 'auto' });
            console.log('File uploaded successfully', response.url);
            return response;

    } catch (error) {
        console.log('Failed to Upload File Error:', error);
        if (file_path) fs.unlinkSync(file_path);  // Delete the file if an error occurs
        return null;
    }
}

export default Upload_File;
