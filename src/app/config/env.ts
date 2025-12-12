import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
  FRONTEND_URL: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  CLOUDINARY_CLOUD_NAME: string;
}
const envConfig: EnvConfig = {
  PORT: (process.env.PORT as string) || "5500",
  DB_URL: process.env.DB_URL as string,
  NODE_ENV:
    (process.env.NODE_ENV as "development" | "production") || "development",
  FRONTEND_URL: process.env.FRONTEND_URL as string,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
};
export default envConfig;
