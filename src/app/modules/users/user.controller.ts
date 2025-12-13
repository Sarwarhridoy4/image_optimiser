import type { Request, Response } from "express";

import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { UserServices } from "./user.service.js";
import { StatusCodes } from "http-status-codes";

const getAllUsers = catchAsync(async (_req: Request, res: Response) => {
  const users = await UserServices.getAllUsers();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Users retrieved successfully",
    data: users,
  });
});

export const UserController = {
  getAllUsers,
};
