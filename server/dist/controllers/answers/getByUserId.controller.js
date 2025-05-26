import { ApiResponse } from "../../utils/ApiResponse.js";
import db from "../../db/db.js";
export const getAnswerByUser = async (req, res) => {
    try {
        const { id } = req.user;
        const answer = await db.answers.findMany({
            where: {
                createdById: id,
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
                upvote: true,
                downvote: true,
                isAccepted: true,
            },
        });
        return res.status(200).json(new ApiResponse({
            message: "Answer retrieved successfully",
            statusCode: 200,
            success: true,
            data: answer,
        }));
    }
    catch (error) {
        return res.status(500).json(new ApiResponse({
            message: "Internal server error",
            statusCode: 500,
            success: false,
        }));
    }
    finally {
        db.$disconnect();
    }
};
