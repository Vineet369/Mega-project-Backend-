import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        // upload file on cloudinary
        cloudinary.uploader.upload(localFilePath, {resource_type: "auto"})
        // file uploaded successfully
        console.log("File uploaded successfully", response.url);
        return response;
;    } catch (error) {
        fs.unlinkSync(localFilePath) /* unlink file on cloudinary as the operation for 
        uploading got failed*/
        return null;
    }
} 



export {uploadOnCloudinary}