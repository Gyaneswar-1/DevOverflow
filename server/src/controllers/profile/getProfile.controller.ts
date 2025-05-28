import type { Request, Response } from "express"
import db from "../../db/db.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import logger from "../../helper/logger.js"

export const getProfile = async (
    req: Request | any,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.user

        const result = await db.user.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                email: true,
                fullName: true,
                userID: true,
                profileImage: {
                    select: {
                        url: true,
                    },
                },
                bio: true,
                city: true,
                country: true,
                createdAt: true,
                updatedAt: true,
                isVerified: true,
                isAdmin: true,
                _count: {
                    select: {
                        questions: true,
                        answers: true,
                    },
                },
            },
        })

        return res.status(200).json(
            new ApiResponse({
                message: "Profile fetched successfully",
                data: result,
                statusCode: 200,
                success: true,
            }),
        )
    } catch (error) {
        logger.error(error)
        return res.status(500).json(
            new ApiResponse({
                message: "Internal server error",
                statusCode: 500,
                success: false,
            }),
        )
    } finally {
        db.$disconnect()
    }
}
