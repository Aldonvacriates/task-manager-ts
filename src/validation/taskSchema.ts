import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(120),
  description: z.string().max(4000).optional(),
  status: z.enum(["todo", "in_progress", "done"]),
  priority: z.enum(["low", "medium", "high"]),
  // A datetime-local input gives local time with no timezone, such as
  // "2026-11-20T14:30". Accept that, and store it as an ISO string in UTC.
  dueDate: z.iso
    .datetime({ local: true, error: "Enter a valid due date" })
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? new Date(v).toISOString() : undefined)),
});

export type TaskInput = z.infer<typeof taskSchema>;
