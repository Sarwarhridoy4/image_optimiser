import type { JwtPayload } from "jsonwebtoken";
import envConfig from "../config/env.js";
import type { IUser } from "../modules/users/user.interface.js";
import { generateToken, verifyToken } from "./jwt.js";
import AppError from "../errorHelpers/AppError.js";
import { StatusCodes } from "http-status-codes";
import { User } from "../modules/users/user.model.js";

// Generate access and refresh tokens
export const createUserTokens = (user: Partial<IUser>) => {
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    envConfig.JWT_ACCESS_SECRET,
    envConfig.JWT_ACCESS_EXPIRES
  );

  const refreshToken = generateToken(
    jwtPayload,
    envConfig.JWT_REFRESH_SECRET,
    envConfig.JWT_REFRESH_EXPIRES
  );

  return {
    accessToken,
    refreshToken,
  };
};

// Refresh token logic: issue new access token
export const createNewAccessTokenWithRefreshToken = async (
  refreshToken: string
) => {
  let verifiedRefreshToken: JwtPayload;

  try {
    verifiedRefreshToken = verifyToken(
      refreshToken,
      envConfig.JWT_REFRESH_SECRET
    ) as JwtPayload;
  } catch (err) {
    console.error("❌ Invalid refresh token:", err);
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid refresh token");
  }

  const user = await User.findOne({ email: verifiedRefreshToken.email });

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User does not exist");
  }

  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const newAccessToken = generateToken(
    jwtPayload,
    envConfig.JWT_ACCESS_SECRET,
    envConfig.JWT_ACCESS_EXPIRES
  );

  return newAccessToken;
};
