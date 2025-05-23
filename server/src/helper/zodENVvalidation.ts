import { z } from "zod"
import dotenv from "dotenv"
dotenv.config()


const envSchema = z.object({
    JWT_SECRET: z.string().nonempty("JWT_SECRET is required"),
    DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL"),
    NODE_ENV: z.enum(["development", "production", "test"]).optional(),
    IMAGEKIT_PUBLIC_KEY: z.string().nonempty("IMAGEKIT_PUBLIC_KEY is required"),
    IMAGEKIT_PRIVATE_KEY: z
        .string()
        .nonempty("IMAGEKIT_PRIVATE_KEY is required"),
    IMAGEKIT_URL_ENDPOINT: z
        .string()
        .url()
        .nonempty("IMAGEKIT_URL_ENDPOINT is required"),
})

const env = envSchema.safeParse(process.env)

if (!env.success) {
    console.error("Environment variable validation failed:", env.error.format())
    process.exit(1)
}

export const validatedEnv = env.data
