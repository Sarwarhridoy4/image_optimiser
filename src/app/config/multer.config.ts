// src/app/config/multer.config.ts

import multer from "multer";
import path from "path";
import { fileFilter } from "./multerFileFilter.js";

/**
 * Configure Multer to store files on disk
 * Destination: ./uploads (you can change it)
 * Filename: sanitized + timestamp to avoid collisions
 */
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, "../../uploads")); // Make sure this folder exists
  },
  filename: (_req, file, cb) => {
    // Sanitize filename: lowercase, replace spaces with dash, append timestamp
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
