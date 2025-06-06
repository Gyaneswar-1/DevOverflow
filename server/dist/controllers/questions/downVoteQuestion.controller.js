import db from "../../db/db.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import logger from "../../helper/logger.js";
export const downVoteQuestion = async (req, res) => {
    try {
        const { qid } = req.params;
        const { id } = req.user;
        const result = await db.questions.update({
            where: {
                id: qid,
            },
            data: {
                upvote: {
                    increment: -1,
                },
            },
        });
        return res.status(200).json(new ApiResponse({
            message: "Downvote completed successfully",
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
