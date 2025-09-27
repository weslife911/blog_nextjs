import { z } from "zod";

export const validateSignupSchema = z.object({
  full_name: z
    .string()
    .min(5, "Full name must be at least 5 characters"),
  email: z
    .string() // Changed to string first for email validation
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
  authType: z.string().optional(),
  isVerified: z.boolean().optional(),
  emailVerificationToken: z.string().optional(),
  profile_pic: z.url("Profile picture must be a valid URL").optional() // Added URL validation
});

export const validateLoginSchema = z.object({
  email: z
    .string() // Changed to string first for email validation
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
});
