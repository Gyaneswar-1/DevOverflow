import { ApiResponse } from "../../utils/ApiResponse.js";
import db from "../../db/db.js";
import imagekit from "../../config/imageKit.js";
import logger from "../../helper/logger.js";
export const deleteProfile = async (req, res) => {
    try {
        const { id } = req.user;
        const profileImageUrl = await db.user.findUnique({
            where: {
                id: id,
            },
            select: {
                profileImage: {
                    select: {
                        fileId: true,
                    },
                },
            },
        });
        const questionsImage = await db.user.findMany({
            where: {
                id: id,
            },
            select: {
                questions: {
                    select: {
                        images: {
                            select: {
                                fileId: true,
                            },
                        },
                    },
                },
            },
        });
        if (profileImageUrl?.profileImage?.fileId) {
            await imagekit.deleteFile(profileImageUrl.profileImage.fileId);
        }
        if (questionsImage?.length > 0 &&
            questionsImage[0]?.questions?.length > 0 &&
            questionsImage[0].questions[0]?.images?.length > 0 &&
            questionsImage[0].questions[0].images[0]?.fileId !== null) {
            for (const question of questionsImage) {
                for (const image of question.questions) {
                    for (const fileid of image.images) {
                        if (fileid?.fileId) {
                            await imagekit.deleteFile(fileid.fileId);
                        }
                    }
                }
            }
        }
        const result = await db.user.delete({
            where: {
                id: id,
            },
        });
        return res.status(200).json(new ApiResponse({
            message: "user Deleted successfully",
            data: result,
            statusCode: 200,
            success: true,
        }));
    }
    catch (error) {
        logger.error(error);
        res.status(500).json(new ApiResponse({
            message: "Server error",
            statusCode: 500,
            data: error,
            success: false,
        }));
    }
    finally {
        db.$disconnect();
    }
};
