import db from "../../db/db.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { type Request, type Response } from "express"

export const getQuestionsById = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params
        const result = await db.questions.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                title: true,
                description: true,
                tags: true,
                createdAt: true,
                images: {
                    select: {
                        url: true,
                    },
                },
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
