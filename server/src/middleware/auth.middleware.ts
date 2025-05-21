import { ApiResponse } from "../utils/ApiResponse.js"
import db from "../db/db.js"
import logger from "../helper/logger.js"
import { type NextFunction, type Request, type Response } from "express"
import jwt from "jsonwebtoken"
import { validatedEnv } from "../helper/zodENVvalidation.js"

interface verifiedToken {
    id: string
    email: string
    userID: string
}


export const authMiddleware = async (
    req: Request | any,
    res: Response,
    next: NextFunction,
): Promise<any> => {
    try {
        const token: string =
            req.headers.authorization?.split(" ")[1] ||
            req.cookies?.token?.split(" ")[1]

        logger.debug(`Token received: ${token}`)

        if (!token) {
            return res.status(401).json(
                new ApiResponse({
                    message: "No token was provided (Access Denied)",
                    success: false,
                    statusCode: 401,
                }),
            )
        }

        let tokenVerification: verifiedToken
        try {
            tokenVerification = jwt.verify(
                token,
                validatedEnv.JWT_SECRET,
            ) as verifiedToken
        } catch (err) {
            logger.error("Token verification failed", err)
            return res.status(403).json(
                new ApiResponse({
                    message: "Invalid or expired token",
                    success: false,
                    statusCode: 403,
                }),
            )
        }

        const isExisUser = await db.user.findUnique({
            where: {
                id: tokenVerification.id,
            },
            select: {
                id: true,
                email: true,
                fullName: true,
                userID: true,
            },
        })

        if (!isExisUser) {
            return res.status(401).json(
                new ApiResponse({
                    message: "Provided token is not valid for the user",
                    success: false,
                    statusCode: 401,
                }),
            )
        }

        req.user = isExisUser
        next()
    } catch (error) {
        logger.error("An error occurred in authMiddleware", error)
        return res.status(500).json(
            new ApiResponse({
                message: "An internal server error occurred",
                success: false,
                statusCode: 500,
            }),
        )
    } finally {
        await db.$disconnect()
    }
}
