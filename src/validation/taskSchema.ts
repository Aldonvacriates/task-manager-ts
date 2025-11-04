import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(120),
  description: z.string().max(4000).optional(),
  status: z.enum(["todo", "in_progress", "done"]),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z
    .string()
    .datetime()
    .optional()
    .or(z.literal(""))
    .transform((v) => v || undefined),
});

export type TaskInput = z.infer<typeof taskSchema>;
