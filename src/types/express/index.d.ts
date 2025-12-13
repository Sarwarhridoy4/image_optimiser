// src/types/express/index.d.ts
declare namespace Express {
  export interface Request {
    profilePicBuffer?: Buffer;
    profilePicFilename?: string;
    certificatePdfBuffer?: Buffer;
    certificatePdfFilename?: string;
  }
}
