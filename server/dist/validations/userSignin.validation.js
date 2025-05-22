import { z } from "zod";
const userSigninSchema = z.object({
    email: z
        .string()
        .email("add a proper email")
        .min(4, "it can not be less than 4 words")
        .nonempty("Email is required"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .nonempty("Password is required"),
});
export { userSigninSchema };
