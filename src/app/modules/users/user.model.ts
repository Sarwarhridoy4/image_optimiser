import { Schema, model } from "mongoose";
import type { IUser } from "./user.interface.js";

/**
 * Mongoose User Schema
 */
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // prevent returning password in queries
    },

    profilePic: {
      type: String,
      required: [true, "Profile picture is required"],
    },

    certificatePdf: {
      type: String,
      required: [true, "Certificate PDF file is required"],
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Index for faster lookup by email
 */
userSchema.index({ email: 1 });

export const User = model<IUser>("User", userSchema);
