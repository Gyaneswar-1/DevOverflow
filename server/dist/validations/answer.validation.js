import { z } from "zod";
export const answerSchema = z.object({
    qid: z
        .string({ message: "it should be string" })
        .nonempty("cannot be empty!"),
    content: z
        .string({ message: "it should be string" })
        .min(1, "cannot be empty!")
        .max(500, "cannot exceed 500 characters")
        .nonempty("cannot be empty!"),
});
