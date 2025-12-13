import type { Request, Response, NextFunction } from "express";
import sharp from "sharp";
import { PDFDocument } from "pdf-lib";
import fs from "fs/promises";
import path from "path";

export const compressFile = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files) return next();

    const files = req.files as {
      profilePic?: Express.Multer.File[];
      certificatePdf?: Express.Multer.File[];
    };

    /* ---------- PROFILE PIC ---------- */
    if (files.profilePic?.[0]) {
      const image = files.profilePic[0];

      const inputBuffer = await fs.readFile(image.path);

      const compressedBuffer = await sharp(inputBuffer)
        .webp({ quality: 80 })
        .toBuffer();

      req.profilePicBuffer = compressedBuffer;
      req.profilePicFilename = path
        .basename(image.originalname, path.extname(image.originalname))
        .toLowerCase()
        .replace(/\s+/g, "-") + ".webp";
    }

    /* ---------- CERTIFICATE PDF ---------- */
    if (files.certificatePdf?.[0]) {
      const pdf = files.certificatePdf[0];

      const inputBuffer = await fs.readFile(pdf.path);

      const pdfDoc = await PDFDocument.load(inputBuffer);
      const compressedPdf = await pdfDoc.save({
        useObjectStreams: true,
      });

      req.certificatePdfBuffer = Buffer.from(compressedPdf);
      req.certificatePdfFilename = pdf.originalname;
    }

    next();
  } catch (error) {
    next(error);
  }
};

