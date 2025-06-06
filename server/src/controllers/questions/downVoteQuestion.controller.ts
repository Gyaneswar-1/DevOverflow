import type { Request, Response } from "express"
import db from "../../db/db.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import logger from "../../helper/logger.js"

export const downVoteQuestion = async (
    req: Request | any,
    res: Response,
): Promise<any> => {
    try {
        const { qid } = req.params
        const { id } = req.user

        const existingVote = await db.votes.findUnique({
            where: {
                uidID_questionID: {
                    uidID: id,
                    questionID: qid,
                },
            },
        })

        if (existingVote) {
            if (existingVote.type === "DOWNVOTE") {
                await db.$transaction([
                    db.votes.delete({
                        where: {
                            id: existingVote.id,
                        },
                    }),
                    db.questions.update({
                        where: { id: qid },
                        data: {
                            downvote: {
                                decrement: 1,
                            },
                        },
                    }),
                ])
            }else{
                await db.$transaction([
                    db.votes.update({
                        where: { id: existingVote.id },
                        data: { type: 'DOWNVOTE' }
                    }),
                    db.questions.update({
                        where: { id: qid },
                        data: { 
                            upvote: { decrement: 1 },
                            downvote: { increment: 1 }
                        }
                    })
                ]) 
            }
        }else{

        }

        const result = await db.questions.update({
            where: {
                id: qid,
            },
            data: {
                upvote: {
                    increment: -1,
                },
            },
        })

        return res.status(200).json(
            new ApiResponse({
                message: "Downvote completed successfully",
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
