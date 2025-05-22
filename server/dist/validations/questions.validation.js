import { z } from "zod";
const questionSchema = z.object({
    title: z
        .string()
        .min(3, "title should be more than 3 characters")
        .max(100, "title should be less than 100 characters")
        .nonempty("title is required"),
    description: z
        .string()
        .min(5, "description should be more than 5 characters")
        .max(500, "description should be less than 500 characters")
        .nonempty("description is required"),
    tags: z.array(z.string()).optional(),
});
export { questionSchema };
