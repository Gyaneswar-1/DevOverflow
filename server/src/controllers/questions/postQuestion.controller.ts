import db from "../../db/db.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { type Request, type Response } from "express"
import imagekit from "../../config/imageKit.js"
import fs from "fs"
import logger from "../../helper/logger.js"

export const postQuestion = async (
    req: Request | any,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.user
        const { title, description, tags } = req.body

        const filePath = req.file.path
        const fileBuffer = fs.readFileSync(filePath)

        let response
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
            return res
                .json(
                    new ApiResponse({
                        message: "failed to upload image",
                        statusCode: 500,
                        success: false,
                    }),
                )
                .status(500)
        }

        const result = await db.questions.create({
            data: {
                createdBy: { connect: { id: id } },
                title: title,
                description: description,
                tags: tags,
                images: {
                    create: {
                        url: response.url,
                    },
                },
            },
        })

        return res
            .json(
                new ApiResponse({
                    message: "posted question successfully",
                    statusCode: 200,
                    success: true,
                    data: result,
                }),
            )
            .status(200)
    } catch (error) {
        logger.error("error occurred", error)
        return res
            .json(
                new ApiResponse({
                    message: "An error occurred",
                    data: { error },
                    statusCode: 500,
                    success: false,
                }),
            )
            .status(500)
    } finally {
        db.$disconnect()
    }
}
