import multer from "multer";
import { fileFilter } from "../middlewares/multerFileFilter.js";

/**
 * Multer memory storage configuration
 * Files are stored as Buffer objects in memory (req.file.buffer)
 * instead of being written to disk
 */
const storage = multer.memoryStorage();

/**
 * Final Multer instance with memory storage
 * Files will be available as Buffer in req.file.buffer or req.files[].buffer
 */
export const multerUpload = multer({
  storage,
  ...(fileFilter && { fileFilter }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

/**
 * Note: When using memory storage:
 * - Files are stored in RAM as Buffer objects
 * - Access uploaded file via: req.file.buffer (single file) or req.files[n].buffer (multiple files)
 * - No filesystem writes occur
 * - Better for cloud uploads (Cloudinary, S3, etc.) where you upload directly from buffer
 * - Be cautious with large files or high traffic as this uses server memory
 * 
 * File object structure with memory storage:
 * {
 *   fieldname: 'profilePic',
 *   originalname: 'photo.jpg',
 *   encoding: '7bit',
 *   mimetype: 'image/jpeg',
 *   buffer: <Buffer ...>,  // The actual file data
 *   size: 12345
 * }
 */