import { z } from "zod";

const membershipTypeSchema = z.enum([
  "BASIC",
  "STANDARD",
  "PREMIUM",
  "CUSTOM",
]);

export const createMembershipPlanSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Plan name is required")
    .max(100, "Plan name must not exceed 100 characters"),

  description: z
    .string()
    .trim()
    .max(
      500,
      "Description must not exceed 500 characters",
    )
    .optional(),

  type: membershipTypeSchema,

  price: z
    .number()
    .positive("Price must be greater than zero"),

  durationInDays: z
    .number()
    .int("Duration must be a whole number")
    .min(
      1,
      "Duration must be at least one day",
    ),

  maxVisitsPerMonth: z
    .number()
    .int("Maximum visits must be a whole number")
    .min(
      1,
      "Maximum visits must be at least 1",
    ),

  autoRenewable: z.boolean(),
});

export const updateMembershipPlanSchema =
  createMembershipPlanSchema.extend({
    active: z.boolean(),
  });