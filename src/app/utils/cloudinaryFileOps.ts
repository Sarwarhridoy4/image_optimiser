import type { UploadApiResponse } from "cloudinary";
import stream from "stream";
import { v2 as cloudinary } from "cloudinary";
import AppError from "../errorHelpers/AppError.js";

/**
 * Uploads a raw buffer to Cloudinary using upload_stream.
 *
 * @param buffer - File buffer (image or PDF)
 * @param fileName - Original filename (used to create a unique public ID)
 * @param folder - Target Cloudinary folder
 * @returns UploadApiResponse - Cloudinary upload result
 */
export const uploadBufferToCloudinary = async (
  buffer: Buffer,
  fileName: string,
  folder: string
): Promise<UploadApiResponse> => {
  try {
    /**
     * Sanitize and create a unique public ID
     */
    const sanitizedName = fileName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-z0-9\-]/g, "");

    const uniqueId = `${sanitizedName}-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}`;

    const public_id = `${folder}/${uniqueId}`;

    /**
     * Cloudinary upload via stream
     */
    return new Promise((resolve, reject) => {
      const pass = new stream.PassThrough();
      pass.end(buffer);

      cloudinary.uploader
        .upload_stream(
          {
            public_id,
            overwrite: true,
            resource_type: "auto", // auto handles image/pdf/video
          },
          (error, result) => {
            if (error || !result) {
              return reject(
                new AppError(
                  500,
                  "Cloudinary upload failed",
                  error?.message || "Unknown upload error"
                )
              );
            }

            resolve(result);
          }
        )
        .end(buffer);
    });
  } catch (error: any) {
    throw new AppError(500, `Cloudinary upload failed: ${error.message}`);
  }
};

/**
 * Deletes a file from Cloudinary using its secure URL.
 *
 * @param url - Full Cloudinary resource URL
 */
export const deleteImageFromCloudinary = async (url: string) => {
  try {
    /**
     * Extract public_id from Cloudinary URL
     * Example:
     *  https://res.cloudinary.com/demo/image/upload/v12345/images/sample.jpg
     *  → images/sample
     */
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.\w+)?$/);

    if (!match || !match[1]) {
      throw new AppError(400, "Invalid Cloudinary URL format.");
    }

    const public_id = match[1];

    // Destroy file
    await cloudinary.uploader.destroy(public_id);

    console.log(`Cloudinary file deleted: ${public_id}`);
  } catch (error: any) {
    throw new AppError(
      500,
      "Cloudinary deletion failed",
      error.message || "Unknown deletion error"
    );
  }
};
