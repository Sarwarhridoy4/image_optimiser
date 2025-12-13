// src/app/modules/profile/userProfile.model.ts
import { Schema, model, Types } from "mongoose";
import type { IUserProfile } from "./profile.interface.js";

const userProfileSchema = new Schema<IUserProfile>(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      unique: true,
    },

    profilePic: {
      type: String,
      required: [true, "Profile picture is required"],
      default: "",
    },

    certificatePdf: {
      type: String,
      required: [true, "Certificate PDF file is required"],
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const UserProfile = model<IUserProfile>(
  "UserProfile",
  userProfileSchema
);
