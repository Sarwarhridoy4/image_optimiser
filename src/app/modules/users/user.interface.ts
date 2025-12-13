import { Types } from "mongoose";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  profile: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
