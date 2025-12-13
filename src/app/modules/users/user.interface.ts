import { Types } from "mongoose";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  profile: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
