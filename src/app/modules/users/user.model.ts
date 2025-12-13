// src/app/modules/user/user.model.ts
import { Schema, model, Types } from "mongoose";
import { UserRole, type IUser } from "./user.interface.js";

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
      select: false,
    },

    role: {
      type: String,
      enum: UserRole,
      default: UserRole.USER,
    },

    profile: {
      type: Types.ObjectId,
      ref: "UserProfile",
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);
