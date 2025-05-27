import { ApiResponse } from "../../utils/ApiResponse.js";
import db from "../../db/db.js";
import logger from "../../helper/logger.js";
export const deleteAnswer = async (req, res) => {
    try {
        const { aid } = req.params;
        const { id } = req.user;
        if (!aid) {
            return res.status(400).json(new ApiResponse({
                message: "Answer ID is not provided",
                statusCode: 400,
                success: false,
            }));
        }
        const answer = await db.answers.findUnique({
            where: {
                id: aid,
            },
            select: {
                id: true,
                createdById: true,
            },
        });
        if (!answer) {
            return res.status(404).json(new ApiResponse({
                message: "Answer not found",
                statusCode: 404,
                success: false,
            }));
        }
        if (answer.createdById !== id) {
            return res.status(403).json(new ApiResponse({
                message: "You are not authorized to delete this answer",
                statusCode: 403,
                success: false,
            }));
        }
        await db.answers.delete({
            where: {
                id: aid,
            },
        });
        return res.status(200).json(new ApiResponse({
            message: "Answer deleted successfully",
            statusCode: 200,
            success: true,
        }));
    }
    catch (error) {
        logger.error("Error happened", error);
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
