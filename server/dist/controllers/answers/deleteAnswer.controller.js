import { ApiResponse } from "../../utils/ApiResponse.js";
import db from "../../db/db.js";
import logger from "../../helper/logger.js";
export const deleteAnswer = async (req, res) => {
    try {
        const { aid } = req.params;
        const { id } = req.user;
        if (!aid) {
            return res.status(400).json(new ApiResponse({
                message: "answer id is not provided",
                statusCode: 400,
                success: false,
            }));
        }
        const result = await db.answers.delete({
            where: {
                id: aid,
                createdById: id
            },
            select: {
                id: true,
                createdById: true
            },
        });
        if (result.id !== aid) {
            return res.status(400).json(new ApiResponse({
                message: "answer not found ",
                statusCode: 400,
                success: false,
            }));
        }
        return res.status(200).json(new ApiResponse({
            message: "answer deleted successfully ",
            statusCode: 200,
            success: true,
        }));
    }
    catch (error) {
        logger.error("Error happend", error);
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
