import { z } from "zod";

/**
 * Zod schema for user registration
 */
export const registerSchema = z.object({
  name: z
    .string({
      error: "Name is required",
    })
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),

  email: z.email("Please enter a valid email address"),

  password: z
    .string({
      error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters"),
});

/**
 * Infer TypeScript type from the Zod schema
 */
export type RegisterInput = z.infer<typeof registerSchema>;
