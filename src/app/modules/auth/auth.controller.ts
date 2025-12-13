import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { authServices } from "./auth.service.js";
import { setAuthCookie } from "../../utils/setCookie.js";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const processedFiles = req.processedFiles || {};

  const profilePicBuffer = processedFiles["profilePic"];
  const certificateBuffer = processedFiles["certificatePdf"];

  const profileOriginalName =
    req.files && !Array.isArray(req.files)
      ? req.files["profilePic"]?.[0]?.originalname
      : undefined;
  const certificateOriginalName =
    req.files && !Array.isArray(req.files)
      ? req.files["certificatePdf"]?.[0]?.originalname
      : undefined;

  const user = await authServices.UserSignupService.register(
    req.body,
    profilePicBuffer as Buffer,
    profileOriginalName as string,
    certificateBuffer as Buffer,
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
