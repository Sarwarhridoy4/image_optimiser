import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  // Server Port
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
  // For frontend URL
  FRONTEND_URL: string;
  // Admin Info
  ADMIN_EMAIL?: string;
  ADMIN_PASSWORD?: string;
  // Cloudinary Configs
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  CLOUDINARY_CLOUD_NAME: string;
  // bcrypt Salt Rounds
  BCRYPT_SALT_ROUNDS?: string;
  // JWT Secret
  JWT_ACCESS_EXPIRES: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_EXPIRES: string;
  JWT_REFRESH_SECRET: string;
  // Smtp Configs
  EMAIL_SENDER: {
    SMTP_USER: string;
    SMTP_PASS: string;
    SMTP_PORT: string;
    SMTP_HOST: string;
    SMTP_FROM: string;
  };
}
const envConfig: EnvConfig = {
  PORT: (process.env.PORT as string) || "5500",
  DB_URL: process.env.DB_URL as string,
  NODE_ENV:
    (process.env.NODE_ENV as "development" | "production") || "development",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string,
  FRONTEND_URL: process.env.FRONTEND_URL as string,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS || "10",
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES || "15m",
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES || "7d",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
  EMAIL_SENDER: {
    SMTP_USER: process.env.SMTP_USER as string,
    SMTP_PASS: process.env.SMTP_PASS as string,
    SMTP_PORT: process.env.SMTP_PORT as string,
    SMTP_HOST: process.env.SMTP_HOST as string,
    SMTP_FROM: process.env.SMTP_FROM as string,
  },
};
export default envConfig;
