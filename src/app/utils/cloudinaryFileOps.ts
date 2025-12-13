import type { UploadApiResponse } from "cloudinary";
import stream from "stream";
import { v2 as cloudinary } from "cloudinary";
import AppError from "../errorHelpers/AppError.js";

/**
 * Uploads a raw buffer to Cloudinary using a stream.
 *
 * @param buffer - File buffer (image or PDF)
 * @param fileName - Original filename (used for unique public ID)
 * @param folder - Cloudinary folder to store the file
 * @param overwrite - Whether to overwrite if the public_id exists (default: true)
 * @param maxRetries - Number of retry attempts in case of failure (default: 2)
 * @returns UploadApiResponse - Cloudinary upload result
 */
export const uploadBufferToCloudinary = async (
  buffer: Buffer,
  fileName: string,
  folder: string,
  overwrite = true,
  maxRetries = 2
): Promise<UploadApiResponse> => {
  if (!buffer || !fileName || !folder) {
    throw new AppError(400, "Invalid parameters for Cloudinary upload");
  }

  const sanitizedName = fileName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-z0-9\-]/g, "");

  const uniqueId = `${sanitizedName}-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2)}`;
  const public_id = `${folder}/${uniqueId}`;

  let attempt = 0;

  const uploadOnce = () =>
    new Promise<UploadApiResponse>((resolve, reject) => {
      const pass = new stream.PassThrough();
      pass.end(buffer);

      cloudinary.uploader
        .upload_stream(
          {
            public_id,
            overwrite,
            resource_type: "auto",
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

  while (attempt <= maxRetries) {
    try {
      const result = await uploadOnce();
      console.log(`✅ Uploaded to Cloudinary: ${result.secure_url}`);
      return result;
    } catch (err) {
      attempt++;
      console.warn(
        `Cloudinary upload attempt ${attempt} failed: ${(err as Error).message}`
      );
      if (attempt > maxRetries) throw err;
    }
  }

  throw new AppError(500, "Cloudinary upload failed after multiple attempts");
};

/**
 * Deletes a file from Cloudinary using its secure URL.
 *
 * @param url - Full Cloudinary resource URL
 * @param maxRetries - Number of retry attempts in case of failure (default: 2)
 */
export const deleteImageFromCloudinary = async (
  url: string,
  maxRetries = 2
) => {
  if (!url) throw new AppError(400, "Cloudinary URL is required");

  // Extract public_id from Cloudinary URL
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.\w+)?$/);
  if (!match || !match[1]) {
    throw new AppError(400, "Invalid Cloudinary URL format");
  }

  const public_id = match[1];

  let attempt = 0;

  const deleteOnce = async () => {
    const result = await cloudinary.uploader.destroy(public_id);
    if (result.result !== "ok" && result.result !== "not found") {
      throw new AppError(
        500,
        `Cloudinary deletion failed for ${public_id}`,
        result.result
      );
    }
    console.log(`✅ Cloudinary file deleted: ${public_id}`);
  };

  while (attempt <= maxRetries) {
    try {
      await deleteOnce();
      return;
    } catch (err) {
      attempt++;
      console.warn(
        `Cloudinary deletion attempt ${attempt} failed: ${
          (err as Error).message
        }`
      );
      if (attempt > maxRetries) throw err;
    }
  }
};
