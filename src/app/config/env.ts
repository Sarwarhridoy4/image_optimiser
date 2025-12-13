import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
  FRONTEND_URL: string;
  ADMIN_EMAIL?: string | undefined;
  ADMIN_PASSWORD?: string | undefined;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  CLOUDINARY_CLOUD_NAME: string;
  BCRYPT_SALT_ROUNDS?: string | undefined;
  JWT_ACCESS_EXPIRES: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_EXPIRES: string;
  JWT_REFRESH_SECRET: string;
  EMAIL_SENDER: {
    SMTP_USER: string;
    SMTP_PASS: string;
    SMTP_PORT: string;
    SMTP_HOST: string;
    SMTP_FROM: string;
  };
}

// Helper function to check required env vars
function ensureEnvVar(key: string, value?: string): string {
  if (!value) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1); // Stop execution
  }
  return value;
}

const envConfig: EnvConfig = {
  PORT: process.env.PORT || "5500",
  DB_URL: ensureEnvVar("DB_URL", process.env.DB_URL),
  NODE_ENV: (process.env.NODE_ENV as "development" | "production") || "development",
  FRONTEND_URL: ensureEnvVar("FRONTEND_URL", process.env.FRONTEND_URL),
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  CLOUDINARY_API_KEY: ensureEnvVar("CLOUDINARY_API_KEY", process.env.CLOUDINARY_API_KEY),
  CLOUDINARY_API_SECRET: ensureEnvVar("CLOUDINARY_API_SECRET", process.env.CLOUDINARY_API_SECRET),
  CLOUDINARY_CLOUD_NAME: ensureEnvVar("CLOUDINARY_CLOUD_NAME", process.env.CLOUDINARY_CLOUD_NAME),
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS || "10",
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES || "15m",
  JWT_ACCESS_SECRET: ensureEnvVar("JWT_ACCESS_SECRET", process.env.JWT_ACCESS_SECRET),
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES || "7d",
  JWT_REFRESH_SECRET: ensureEnvVar("JWT_REFRESH_SECRET", process.env.JWT_REFRESH_SECRET),
  EMAIL_SENDER: {
    SMTP_USER: ensureEnvVar("SMTP_USER", process.env.SMTP_USER),
    SMTP_PASS: ensureEnvVar("SMTP_PASS", process.env.SMTP_PASS),
    SMTP_PORT: ensureEnvVar("SMTP_PORT", process.env.SMTP_PORT),
    SMTP_HOST: ensureEnvVar("SMTP_HOST", process.env.SMTP_HOST),
    SMTP_FROM: ensureEnvVar("SMTP_FROM", process.env.SMTP_FROM),
  },
};

console.log("✅ All required environment variables are loaded successfully.");

export default envConfig;
