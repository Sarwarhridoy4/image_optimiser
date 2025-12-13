import { Types } from "mongoose";

export interface IUserProfile {
  user: Types.ObjectId;
  profilePic: string;
  certificatePdf: string;
}
