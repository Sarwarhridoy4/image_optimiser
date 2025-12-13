import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { authServices } from "./auth.service.js";
import { setAuthCookie } from "../../utils/setCookie.js";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  // Get processed/compressed buffers and filenames from compressFile middleware
  const profilePicBuffer = req.profilePicBuffer;
  const certificateBuffer = req.certificatePdfBuffer;

  const profileOriginalName = req.profilePicFilename;
  const certificateOriginalName = req.certificatePdfFilename;

  if (!profilePicBuffer || !certificateBuffer) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Profile picture and certificate PDF are required",
    });
    return;
  }

  const user = await authServices.UserSignupService.register(
    req.body,
    profilePicBuffer,
    profileOriginalName as string,
    certificateBuffer,
    certificateOriginalName as string
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "User registered successfully",
    data: user,
  });
});

const credentialsLogin = catchAsync(
  async (req: Request, res: Response) => {
    const loginInfo = await authServices.credentialsLogin(req.body);

    setAuthCookie(res, loginInfo);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "User Login Success",
      data: loginInfo,
    });
  }
);

export const AuthController = {
    registerUser,
    credentialsLogin,
};
