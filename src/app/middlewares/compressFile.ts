import type { Request, Response, NextFunction } from "express";
import sharp from "sharp";
import { PDFDocument } from "pdf-lib";
import path from "path";
import AppError from "../errorHelpers/AppError.js";

export const compressFile = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files) return next();

    const files = req.files as Express.Multer.File[];

    for (const file of files) {
      if (file.mimetype.startsWith("image/")) {
        try {
          const compressedBuffer = await sharp(file.buffer)
            .webp({ quality: 80 })
            .toBuffer();

          file.buffer = compressedBuffer;
          file.originalname =
            path.basename(file.originalname, path.extname(file.originalname)) +
            ".webp";
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          return next(new AppError(500, "Image compression failed.", errorMessage));
        }
      } else if (file.mimetype === "application/pdf") {
        try {
          const pdfDoc = await PDFDocument.load(file.buffer);
          const compressedPdf = await pdfDoc.save({
            useObjectStreams: true,
          });
          file.buffer = Buffer.from(compressedPdf);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          return next(new AppError(500, "PDF compression failed.", errorMessage));
        }
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};