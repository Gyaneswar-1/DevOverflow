import { z } from "zod";

export const questionSchema = z.object({
  title: z
    .string()
    .min(3, "Title should be more than 3 characters")
    .max(100, "Title should be less than 100 characters")
    .nonempty("Title is required"),
  description: z
    .string()
    .min(5, "Description should be more than 5 characters")
    .max(500, "Description should be less than 500 characters")
    .nonempty("Description is required"),
  tags: z.union([
    z.string(),
    z.array(z.string())
  ]).optional(),
});
