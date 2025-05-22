import db from "../../db/db.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { type Request, type Response } from "express"
import imagekit from "../../config/imageKit.js"
import fs from "fs"
import logger from "../../helper/logger.js"
import { questionSchema } from "../../validations/questions.validation.js"

export const postQuestion = async (
    req: Request | any,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.user
        const { title, description, tags } = req.body

        const questionValidation = questionSchema.safeParse({
            title,
            description,
            tags,
        })

        if (questionValidation.error) {
            return res.status(400).json(
                new ApiResponse({
                    message: "validation error",
                    statusCode: 400,
                    success: false,
                    data: questionValidation.error.flatten().fieldErrors,
                }),
            )
        }

        let response = null
        if (req.file.path && req.file) {
            const filePath = req.file.path
            const fileBuffer = fs.readFileSync(filePath)

            try {
                response = await imagekit.upload({
                    file: fileBuffer,
                    fileName: req.file.originalname,
                })

                fs.unlinkSync(filePath)
            } catch (error) {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath)
                }
                logger.error("error uploading image to ImageKit", error)
                return res.status(500).json(
                    new ApiResponse({
                        message: "failed to upload image",
                        statusCode: 500,
                        success: false,
                    }),
                )
            }
        }

        const result = await db.questions.create({
            data: {
                createdBy: { connect: { id: id } },
                title: title,
                description: description,
                tags: tags,
                images: response
                    ? {
                          create: {
                              url: response.url,
                              fileId: response.fileId,
                          },
                      }
                    : undefined,
            },
        })

        return res.status(200).json(
            new ApiResponse({
                message: "posted question successfully",
                statusCode: 200,
                success: true,
                data: result,
            }),
        )
    } catch (error) {
        logger.error("error occurred", error)
        return res.status(500).json(
            new ApiResponse({
                message: "An error occurred",
                data: { error },
                statusCode: 500,
                success: false,
            }),
        )
    } finally {
        db.$disconnect()
    }
}
