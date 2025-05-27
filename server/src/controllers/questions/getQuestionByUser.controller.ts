import db from "../../db/db.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { type Request, type Response } from "express"

export const getQuestionsById = async (
    req: Request | any,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.user
        const result = await db.questions.findMany({
            where: {
                createdById: id,
            },
            select: {
                title: true,
                description: true,
                upvote: true,
                downvote: true,
                tags: true,
                createdAt: true,
                _count: {
                    select: {
                        answers: true,
                    },
                },
            },
        })

        return res.status(200).json(
            new ApiResponse({
                message: "Question fetched successfully",
                data: result,
                statusCode: 200,
                success: true,
            }),
        )
    } catch (error) {
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
