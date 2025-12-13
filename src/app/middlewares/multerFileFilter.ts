// src/app/config/multerFileFilter.ts

import type{ Request } from "express";
import multer from "multer";

/**
 * File filter for Multer
 * Accepts only images (png, jpg, jpeg) and PDFs
 */
export const fileFilter: multer.Options["fileFilter"] = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    // Pass an error to Multer
    return cb(new Error("Invalid file type. Only PNG, JPEG, JPG, and PDF are allowed."));
  }

  // Accept the file
  cb(null, true);
};
