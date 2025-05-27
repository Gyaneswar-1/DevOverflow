import logger from "../../helper/logger.js";
import db from "../../db/db.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import imagekit from "../../config/imageKit.js";
export const deleteQuestion = async (req, res) => {
    try {
        const { qid } = req.params;
        const { id } = req.user;
        const question = await db.questions.findUnique({
            where: {
                id: qid,
            },
            select: {
                createdById: true,
                images: {
                    select: {
                        fileId: true,
                    },
                },
            },
        });
        if (!question) {
            return res.status(404).json(new ApiResponse({
                message: "Question not found",
                statusCode: 404,
                success: false,
            }));
        }
        if (question.createdById !== id) {
            return res.status(403).json(new ApiResponse({
                message: "You are not authorized to delete this question",
                statusCode: 403,
                success: false,
            }));
        }
        if (question.images.length > 0) {
            for (const i of question.images) {
                if (i.fileId !== null) {
                    await imagekit.deleteFile(i.fileId);
                }
            }
        }
        await db.questions.delete({
            where: {
                id: qid,
            },
        });
        return res.status(200).json(new ApiResponse({
            message: "Question deleted successfully",
            statusCode: 200,
            success: true,
        }));
    }
    catch (error) {
        logger.error("Error deleting question", error);
        res.status(500).json(new ApiResponse({
            message: "Internal server error",
            statusCode: 500,
            success: false,
            data: error,
        }));
    }
};
