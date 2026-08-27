import { z } from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(
      100,
      "First name cannot exceed 100 characters",
    ),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(
      100,
      "Last name cannot exceed 100 characters",
    ),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(
      255,
      "Email cannot exceed 255 characters",
    ),

  phone: z
    .string()
    .trim()
    .max(
      30,
      "Phone number cannot exceed 30 characters",
    )
    .optional()
    .or(z.literal("")),

  password: z
    .string()
    .min(
      8,
      "Password must contain at least 8 characters",
    )
    .max(
      100,
      "Password cannot exceed 100 characters",
    ),
});

export type RegisterFormValues =
  z.infer<typeof registerSchema>;