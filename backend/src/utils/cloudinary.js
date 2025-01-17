import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        console.log("Image uploaded successfully", response.url);
        return response.url;
    } catch (error) {
        console.error("Error uploading image to Cloudinary", error);
        throw error;
    } finally {
        // Clean up the local file after upload
        fs.unlinkSync(localFilePath);
    }
};

export { uploadOnCloudinary };