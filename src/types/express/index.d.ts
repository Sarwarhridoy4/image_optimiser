import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
      profilePicBuffer?: Buffer;
      certificatePdfBuffer?: Buffer;
      profilePicFilename?: string;
      certificatePdfFilename?: string;
    }
  }
}
