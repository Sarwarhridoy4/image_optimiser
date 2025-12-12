/**
 * TypeScript Interface for User Document
 */
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  profilePic: string;       // Cloudinary secure URL (Required)
  certificatePdf: string;   // Cloudinary secure URL (Required)
  createdAt: Date;
  updatedAt: Date;
}