import { z } from "zod"

export const profileUpdateSchema = z.object({
    fullName: z
        .string()
        .max(30, "fullName size should be less than 30")
        .min(5, "fullname size should be greater than 5")
        .optional(),
    userID: z
        .string()
        .max(16, "user id should be under 16 charecters")
        .min(5, "user id should be more than 5 cherecters ")
        .optional(),
    email: z
        .string()
        .email("add a proper email")
        .min(4, "it can not be less than 4 words")
        .optional(),
    bio: z.string().max(500, "bio size should be less than 500").optional(),
    city: z.string().max(50, "city size should be less than 50").optional(),
    country: z
        .string()
        .max(50, "country size should be less than 50")
        .optional(),
})
