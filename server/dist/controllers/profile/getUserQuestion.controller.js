import db from "../../db/db.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import logger from "../../helper/logger.js";
export const getUserQuestions = async (req, res) => {
    try {
        const { id } = req.user;
        const result = await db.questions.findMany({
            where: {
                createdById: id,
            },
            select: {
                id: true,
                title: true,
                description: true,
                tags: true,
                upvote: true,
                _count: {
                    select: {
                        answers: true,
                    },
                },
                createdAt: true,
            },
        });
        return res.status(200).json(new ApiResponse({
            message: "Fetched user questions successfully",
            data: result,
            statusCode: 200,
            success: true,
        }));
    }
    catch (error) {
        logger.error(error);
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
