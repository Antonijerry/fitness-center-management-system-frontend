import { z } from "zod";

export const trainerSchema = z
  .object({
    userId: z
      .number({
        error: "Please select a valid user",
      })
      .int()
      .positive("Please select a valid user")
      .optional(),

    specialization: z
      .string()
      .trim()
      .min(1, "Specialization is required")
      .max(
        150,
        "Specialization must not exceed 150 characters",
      ),

    certifications: z
      .string()
      .trim()
      .max(
        1000,
        "Certifications must not exceed 1000 characters",
      )
      .optional()
      .or(z.literal("")),

    yearsOfExperience: z
      .number()
      .int(
        "Years of experience must be a whole number",
      )
      .min(
        0,
        "Years of experience cannot be negative",
      )
      .max(
        60,
        "Years of experience cannot exceed 60 years",
      )
      .optional(),

    bio: z
      .string()
      .trim()
      .max(
        2000,
        "Bio must not exceed 2000 characters",
      )
      .optional()
      .or(z.literal("")),

    hourlyRate: z
      .number()
      .min(
        0,
        "Hourly rate cannot be negative",
      )
      .optional(),
  })
  .refine(
    (data) => data.userId !== undefined,
    {
      path: ["userId"],
      message: "Please select a user",
    },
  );

export type TrainerFormValues = z.infer<
  typeof trainerSchema
>;