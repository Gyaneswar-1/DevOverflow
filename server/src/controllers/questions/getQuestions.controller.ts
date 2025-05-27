import { ApiResponse } from "../../utils/ApiResponse.js"
import db from "../../db/db.js"
import { response, type Request, type Response } from "express"
import logger from "../../helper/logger.js"

export const getQuestions = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const result = await db.questions.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                tags: true,
                createdAt: true,
                upvote:true,
                createdBy: {
                    select: {
                        id: true,
                        fullName: true,
                        profileImage: {
                            select: {
                                url: true,
                            },
                        },
                    },
                },
                _count: {
                    select: {
                        answers: true,
                    },
                },
            },
        })

        return res.status(200).json(
            new ApiResponse({
                message: "Questions fetched successfully",
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
                data: error,
                statusCode: 500,
                success: false,
            }),
        )
    } finally {
        db.$disconnect()
    }
}
