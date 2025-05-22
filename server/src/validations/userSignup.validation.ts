import { z } from "zod"

const userSignupSchema = z.object({
    email: z
        .string()
        .email("add a proper email")
        .min(4, "it can not be less than 4 words")
        .nonempty("Email is required"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .nonempty("Password is required"),
    userID: z
        .string()
        .max(16, "user id should be under 16 charecters")
        .min(5, "user id should be more than 5 cherecters ")
        .nonempty("user id is required"),
    fullName: z
        .string()
        .max(30, "fullName size should be less than 30")
        .min(5, "fullname size should be greater than 5")
        .optional(),
})

export { userSignupSchema }

