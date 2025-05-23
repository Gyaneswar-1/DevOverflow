import { string } from "zod/v4"
import { validatedEnv } from "../helper/zodENVvalidation.js"
import type { Request, Response } from "express"

export const Apidelay = (_: Request, __: Response, next: any) => {
    const delay = 3000
    setTimeout(() => {
        next()
    }, delay)
}
