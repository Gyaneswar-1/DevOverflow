import logger from "../../helper/logger.js";
import db from "../../db/db.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import imagekit from "../../config/imageKit.js";
export const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const imageData = await db.questions.findUnique({
            where: {
                id: id,
            },
            select: {
                images: {
                    select: {
                        fileId: true,
                    },
                },
            },
        });
        if (imageData !== null && imageData.images.length > 0) {
            for (const i of imageData.images) {
                if (i.fileId !== null) {
                    await imagekit.deleteFile(i.fileId);
                }
            }
        }
        await db.questions.delete({
            where: {
                id: id,
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
