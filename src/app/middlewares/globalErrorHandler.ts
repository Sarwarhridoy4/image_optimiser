/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { NextFunction, Request, Response } from "express";
import envConfig from "../config/env.js";
import type { TErrorSources } from "../interfaces/error.types.js";
import { handlerDuplicateError } from "../helpers/handleDuplicateError.js";
import { handleCastError } from "../helpers/handleCastError.js";
import { handlerZodError } from "../helpers/handlerZodError.js";
import AppError from "../errorHelpers/AppError.js";
import { handlerValidationError } from "../helpers/handlerValidationError.js";

/**
 * Global Error Handler Middleware
 * Handles:
 * - MongoDB duplicate errors
 * - Mongoose cast errors
 * - Zod validation errors
 * - Mongoose validation errors
 * - Custom AppError
 * - Native JS Error
 * - Unknown/unstructured errors
 */
export const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log full error only in development mode
  if (envConfig.NODE_ENV === "development") {
    console.log(err);
  }

  // Default error response values
  let statusCode = 500;
  let message = "Something Went Wrong!!";
  let errorSources: TErrorSources[] = [];

  /**
   * Category: MongoDB Duplicate Key Error
   * Example: Unique field violation
   */
  if (err?.code === 11000) {
    const simplified = handlerDuplicateError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
  } else if (err?.name === "CastError") {

  /**
   * Category: Mongoose CastError
   * Example: Invalid ObjectId format
   */
    const simplified = handleCastError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
  } else if (err?.name === "ZodError") {

  /**
   * Category: Zod Validation Error
   * Example: Schema validation failure
   */
    const simplified = handlerZodError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorSources = simplified.errorSources || [];
  } else if (err?.name === "ValidationError") {

  /**
   * Category: Mongoose Validation Error
   * Example: Required field missing in schema
   */
    const simplified = handlerValidationError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorSources = simplified.errorSources || [];
  } else if (err instanceof AppError) {

  /**
   * Category: Custom AppError instance
   * Example: throw new AppError("Not Found", 404)
   */
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {

  /**
   * Category: Native JavaScript Error
   * Example: throw new Error("Something failed")
   */
    statusCode = 500;
    message = err.message || message;
  } else {

  /**
   * Category: Unknown or non-standard error
   * Handles cases such as:
   * - throw "Error text"
   * - throw 500
   * - throw { custom: "data" }
   * - Promise rejection with arbitrary payload
   */
    statusCode = err?.statusCode || 500;

    // Normalize message from different types of thrown values
    message =
      err?.message ||
      (typeof err === "string"
        ? err
        : typeof err === "object"
        ? JSON.stringify(err)
        : message);
  }

  // Final structured JSON response
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // Only show raw error & stack trace in dev mode
    err: envConfig.NODE_ENV === "development" ? err : null,
    stack: envConfig.NODE_ENV === "development" ? err?.stack : null,
  });
};
