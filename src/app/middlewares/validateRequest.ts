
import type { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

/**
 * validateRequest
 * ----------------
 * A reusable request validation middleware that:
 *  - Accepts a Zod schema
 *  - Parses and validates the incoming request body
 *  - Transforms the body into a fully typed and validated object
 *  - Forwards validation errors to the global error handler
 *
 * Supports both:
 *  - Standard JSON request bodies
 *  - Requests where the payload is wrapped inside `req.body.data`
 */
export const validateRequest =
  (zodSchema: ZodObject) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      /**
       * Some clients send the body as:
       *   { data: "{...json-string...}" }
       *
       * If `req.body.data` exists, attempt to parse it into an object.
       */
      if (req.body && req.body.data) {
        req.body = JSON.parse(req.body.data);
      }

      /**
       * Validate and parse the request body using the provided Zod schema.
       * parseAsync() ensures:
       *  - async refinements are supported
       *  - strong type inference
       *  - consistent validation behavior
       */
      req.body = await zodSchema.parseAsync(req.body);

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      /**
       * Forward any validation error (ZodError) or unexpected error
       * to the global error handler.
       */
      next(error);
    }
  };
