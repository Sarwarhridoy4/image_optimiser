import { User } from "./user.model.js";
import AppError from "../../errorHelpers/AppError.js";
import { StatusCodes } from "http-status-codes";


const getAllUsers = async () => {
  const users = await User.find()
    .populate("profile")
    .select("-password")
    .sort({ createdAt: -1 });

  if (!users.length) {
    throw new AppError(StatusCodes.NOT_FOUND, "No users found");
  }

  return users;
};

export const UserServices = {
  getAllUsers,
};
