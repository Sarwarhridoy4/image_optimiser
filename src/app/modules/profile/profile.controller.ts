import type { Request, Response, NextFunction } from "express";
import { User } from "../users/user.model.js";
import { UserProfile } from "./profile.model.js";
import { uploadBufferToCloudinary } from "../../utils/cloudinaryFileOps.js";
import AppError from "../../errorHelpers/AppError.js";
import { StatusCodes } from "http-status-codes";

const updateProfilePicture = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const file = req.file;

    if (!file) {
      throw new AppError(StatusCodes.BAD_REQUEST, "No file uploaded.");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, "User not found.");
    }

    const result = await uploadBufferToCloudinary(
      file.buffer,
      file.originalname,
      "profile-pictures"
    );

    let userProfile = await UserProfile.findOne({ user: userId });
    if (!userProfile) {
      userProfile = new UserProfile({
        user: userId,
        profilePic: result.secure_url,
      });
    } else {
      userProfile.profilePic = result.secure_url;
    }

    await userProfile.save();

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Profile picture updated successfully.",
      data: {
        profilePic: result.secure_url,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const ProfileController = {
  updateProfilePicture,
};
