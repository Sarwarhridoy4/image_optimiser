import envConfig from "./env.js";
import { v2 as cloudinary } from "cloudinary";

/**
 * Cloudinary Configuration
 * Loads credentials from environment variables.
 */
cloudinary.config({
  cloud_name: envConfig.CLOUDINARY_CLOUD_NAME,
  api_key: envConfig.CLOUDINARY_API_KEY,
  api_secret: envConfig.CLOUDINARY_API_SECRET,
});

/**
 * Export configured instance if needed externally
 */
export const cloudinaryUpload = cloudinary;
