import { z } from "zod";

export const createUserSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(100, "First name must not exceed 100 characters"),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(100, "Last name must not exceed 100 characters"),

  email: z
    .string()
    .trim()
    .email("Email must be valid")
    .max(255, "Email must not exceed 255 characters"),

  phone: z
    .string()
    .trim()
    .max(30, "Phone must not exceed 30 characters")
    .optional(),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .max(100, "Password must not exceed 100 characters"),
});

export const updateUserSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(100, "First name must not exceed 100 characters"),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(100, "Last name must not exceed 100 characters"),

  email: z
    .string()
    .trim()
    .email("Email must be valid")
    .max(255, "Email must not exceed 255 characters"),

  phone: z
    .string()
    .trim()
    .max(30, "Phone must not exceed 30 characters")
    .optional(),
});

export type CreateUserFormValues =
  z.infer<typeof createUserSchema>;

export type UpdateUserFormValues =
  z.infer<typeof updateUserSchema>;