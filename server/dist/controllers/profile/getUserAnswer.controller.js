import db from "../../db/db.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import logger from "../../helper/logger.js";
export const getUserAnswers = async (req, res) => {
    try {
        const { id } = req.user;
        const result = await db.answers.findMany({
            where: {
                createdById: id,
            },
            select: {
                id: true,
                content: true,
                upvote: true,
                isAccepted: true,
                createdAt: true,
            },
        });
        return res.status(200).json(new ApiResponse({
            message: "Operation completed successfully",
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
