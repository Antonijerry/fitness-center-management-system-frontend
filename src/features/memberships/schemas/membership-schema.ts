import { z } from "zod";

export const createMembershipSchema = z.object({
  userId: z
    .number()
    .int("Member selection is invalid")
    .positive("Please select a member"),

  planId: z
    .number()
    .int("Membership plan selection is invalid")
    .positive("Please select a membership plan"),

  startDate: z
    .string()
    .min(1, "Start date is required"),

  autoRenewable: z.boolean(),

  notes: z
    .string()
    .trim()
    .max(
      500,
      "Notes must not exceed 500 characters",
    )
    .optional(),
});