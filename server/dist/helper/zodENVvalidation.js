import { z } from "zod";
// Define the schema for environment variables
const envSchema = z.object({
    JWT_SECRET: z.string().nonempty("JWT_SECRET is required"),
    DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL"),
    NODE_ENV: z.enum(["development", "production", "test"]).optional(),
});
const env = envSchema.safeParse(process.env);
if (!env.success) {
    console.error("Environment variable validation failed:", env.error.format());
    process.exit(1);
}
export const validatedEnv = env.data;
