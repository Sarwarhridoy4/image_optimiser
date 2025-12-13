import z from "zod";
import { UserRole } from "../users/user.interface.js";

export const userRegisterSchema = z.object({
  // Basic Info
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  
  // Role & Status
  role: z.enum([UserRole.USER, UserRole.ADMIN]).optional().default(UserRole.USER),
});

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});