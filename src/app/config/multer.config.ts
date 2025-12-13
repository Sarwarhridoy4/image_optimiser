import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { fileFilter } from "../middlewares/multerFileFilter.js";

/**
 * ESM-safe __dirname
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Absolute upload directory (project root /uploads)
 * DO NOT place uploads inside /src
 */
const uploadDir = path.resolve(process.cwd(), "uploads");

/**
 * Ensure uploads folder exists BEFORE Multer runs
 */
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`Upload folder created at: ${uploadDir}`);
}

/**
 * Multer disk storage configuration
 */
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },

  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);

    // Sanitize filename
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
 * Final Multer instance
 */
export const multerUpload = multer({
  storage,
  ...(fileFilter && { fileFilter }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

/**
 * Optional: export uploadDir for static serving
 */
export { uploadDir };
