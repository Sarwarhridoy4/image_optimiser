import multer from "multer";
import path from "path";
import fs from "fs";
import { fileFilter } from "./multerFileFilter.js";

/**
 * Ensure uploads folder exists
 */
const uploadDir = path.join(__dirname, "../../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`✅ Upload folder created at: ${uploadDir}`);
}

/**
 * Configure Multer to store files on disk
 * Filename: sanitized + timestamp to avoid collisions
 */
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

    const timestamp = Date.now();
    cb(null, `${name}-${timestamp}${ext}`);
  },
});

/**
 * Multer configuration
 * - Disk storage
 * - File size limit 10MB
 * - Optional file type validation
 */
export const multerUpload = multer({
  storage,
  ...(fileFilter && { fileFilter }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});
