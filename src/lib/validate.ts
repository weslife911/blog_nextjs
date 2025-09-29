import { z } from "zod";

export const validateSignupSchema = z.object({
  full_name: z
    .string()
    .min(5, "Full name must be at least 5 characters"),
  email: z
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
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
});

export const validateBlogSchema = z.object({
    blogTitle: z.string(),
    blogContent: z.string(),
    blogImage: z.string().optional(),
    blogAuthorID: z.string(),
    blogCategory: z.string(),
    blogTags: z.array(z.string()).optional()
});

export const validateCommentSchema = z.object({
    user: z.string(),
    blog: z.string(),
    comment: z.string()
});
