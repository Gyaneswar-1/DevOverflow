import { ApiResponse } from "../../utils/ApiResponse.js";
import db from "../../db/db.js";
import logger from "../../helper/logger.js";
import { answerSchema } from "../../validations/answer.validation.js";
export const postAnswer = async (req, res) => {
    try {
        const { id } = req.user;
        const { qid, content } = req.body;
        const validate = answerSchema.safeParse({
            qid,
            content,
        });
        if (validate.error) {
            return res.status(500).json(new ApiResponse({
                message: "Validation error",
                statusCode: 500,
                success: false,
                data: validate.error.flatten().fieldErrors,
            }));
        }
        const isExist = await db.questions.findUnique({
            where: { id: qid },
            select: { id: true },
        });
        if (!isExist) {
            return res.status(404).json(new ApiResponse({
                message: "question not found",
                statusCode: 404,
                success: false,
                data: null,
            }));
        }
        const answer = await db.answers.create({
            data: {
                questionId: isExist.id,
                content: content,
                createdById: id,
            },
        });
        logger.info(id, qid, content);
        return res.status(201).json({
            message: "answer created successfully",
            statusCode: 201,
            success: true,
            data: answer,
        });
    }
    catch (error) {
        console.error("Error in postAnswer:", error);
        return res.status(500).json(new ApiResponse({
            message: "Internal server error",
            statusCode: 500,
            success: false,
            data: null,
        }));
    }
    finally {
        db.$disconnect();
    }
};
