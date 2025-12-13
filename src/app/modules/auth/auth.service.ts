import mongoose from "mongoose";
import bcrypt from "bcrypt";
import AppError from "../../errorHelpers/AppError.js";
import { StatusCodes } from "http-status-codes";
import { User } from "../users/user.model.js";
import envConfig from "../../config/env.js";
import {
  deleteImageFromCloudinary,
  uploadBufferToCloudinary,
} from "../../utils/cloudinaryFileOps.js";
import { UserProfile } from "../profile/profile.model.js";
import type { RegisterPayload } from "./auth.interface.js";
import type { IUser } from "../users/user.interface.js";
import { createUserTokens } from "../../utils/userToken.js";
import { sendEmail } from "../../utils/sendMail.js";

const UserSignupService = {
  // User Registration
  register: async (
    payload: RegisterPayload,
    profilePicBuffer: Buffer,
    profilePicOriginalName: string,
    certificateBuffer: Buffer,
    certificateOriginalName: string
  ) => {
    // console.log("profile_pic", profilePicBuffer);
    // console.log("pdf buffer", certificateBuffer);
    if (!profilePicBuffer || !profilePicOriginalName) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Profile picture is required"
      );
    }

    if (!certificateBuffer || !certificateOriginalName) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Certificate PDF is required"
      );
    }

    const session = await mongoose.startSession();

    let profilePicUrl: string | null = null;
    let certificatePdfUrl: string | null = null;
    let createdUser: any = null;

    try {
      session.startTransaction();

      const existingUser = await User.findOne({ email: payload.email }, null, {
        session,
      });

      if (existingUser) {
        throw new AppError(StatusCodes.CONFLICT, "Email already registered");
      }

      const hashedPassword = await bcrypt.hash(
        payload.password,
        Number(envConfig.BCRYPT_SALT_ROUNDS)
      );

      // Upload profile picture
      const profileUpload = await uploadBufferToCloudinary(
        profilePicBuffer,
        profilePicOriginalName,
        "profile-pictures"
      );
      profilePicUrl = profileUpload.secure_url;

      // Upload certificate
      const certificateUpload = await uploadBufferToCloudinary(
        certificateBuffer,
        certificateOriginalName,
        "certificates"
      );
      certificatePdfUrl = certificateUpload.secure_url;

      const [user] = await User.create(
        [
          {
            name: payload.name,
            email: payload.email,
            password: hashedPassword,
          },
        ],
        { session }
      );

      if (!user) {
        throw new AppError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Failed to create user"
        );
      }

      const [profile] = await UserProfile.create(
        [
          {
            user: user._id,
            profilePic: profilePicUrl,
            certificatePdf: certificatePdfUrl,
          },
        ],
        { session }
      );

      if (!profile) {
        throw new AppError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Failed to create user profile"
        );
      }

      user.profile = profile._id;
      await user.save({ session });

      await session.commitTransaction();

      createdUser = user;
      return user;
    } catch (error) {
      await session.abortTransaction();

      // Rollback uploaded files
      if (profilePicUrl) {
        await deleteImageFromCloudinary(profilePicUrl);
      }
      if (certificatePdfUrl) {
        await deleteImageFromCloudinary(certificatePdfUrl);
      }

      throw error;
    } finally {
      session.endSession();

      // Send welcome email AFTER successful commit
      if (createdUser) {
        try {
          await sendEmail({
            to: createdUser.email,
            subject: "Welcome to Dream Wallet 🎉",
            templateName: "welcome-user",
            templateData: {
              name: createdUser.name,
              appName: "ImageCompressUpload",
              loginUrl: `${envConfig.FRONTEND_URL}/login`,
              supportEmail: "support@image-compress.com",
            },
          });
        } catch (emailError) {
          // Do NOT break registration if email fails
          console.error("Welcome email failed:", emailError);
        }
      }
    }
  },
  // End of User Registration
};
const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Email and password are required"
    );
  }

  // Explicitly include password (select: false in schema)
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    user.password as string
  );

  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
  }

  const tokens = createUserTokens(user);

  // Remove password before sending response
  const { password: _removed, ...safeUser } = user.toObject();

  return {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    user: safeUser,
  };
};

export const authServices = {
  UserSignupService,
  credentialsLogin,
};
