// src/config/db.ts
import mongoose from "mongoose";
import envConfig from "./env.js";

const URI = envConfig.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log(`🟢 MongoDB connected at ${envConfig.NODE_ENV}`);
  } catch (error) {
    console.error("🔴 MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
