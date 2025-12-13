// src/types/express/index.d.ts
declare namespace Express {
  export interface Request {
    processedFileBuffer?: Buffer;
    processedFiles?: Record<string, Buffer>;
    uploadedFileUrl?: string;
  }
}
