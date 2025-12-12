import type { Request, Response, NextFunction } from "express";
import sharp from "sharp";
import { PDFDocument } from "pdf-lib";

export const compressFile = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) return next();

    const mime = req.file.mimetype;

    if (mime.startsWith("image")) {
      // Image → compress to WebP
      req.file.originalname = req.file.originalname.replace(
        /\.[^/.]+$/,
        ".webp"
      );

      const compressedBuffer = await sharp(req.file.buffer)
        .webp({ quality: 80 })
        .toBuffer();

      req.processedFileBuffer = compressedBuffer;
    } else if (mime === "application/pdf") {
      // PDF → compress/rewrite using pdf-lib
      const pdfDoc = await PDFDocument.load(req.file.buffer);
      const compressedPdf = await pdfDoc.save({
        useObjectStreams: true, // helps reduce size
      });

      req.processedFileBuffer = Buffer.from(compressedPdf);
    } else {
      // Other files → leave as-is
      req.processedFileBuffer = req.file.buffer;
    }

    next();
  } catch (error) {
    next(error);
  }
};
