import { ApiResponse } from "../../utils/ApiResponse.js"
import db from "../../db/db.js"
import type { Request, Response } from "express"

export const getAnswer = async (req: Request, res: Response): Promise<any> => {
    try {
        const { qid } = req.body

        const questionid = await db.questions.findUnique({
            where: {
                id: qid,
            },
        })

        if (!questionid) {
            return res.status(404).json(
                new ApiResponse({
                    message: "Question not found",
                    statusCode: 404,
                    success: false,
                }),
            )
        }

        const answer = await db.answers.findMany({
            where: {
                questionId: qid,
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
                upvote: true,
                downvote: true,
                isAccepted: true,
                createdBy: {
                    select: {
                        id: true,
                        fullName: true,
                        profileImage: true,
                    },
                },
            },
        })
        return res.status(200).json(
            new ApiResponse({
                message: "Answer retrieved successfully",
                statusCode: 200,
                success: true,
                data: answer,
            }),
        )
    } catch (error) {
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
