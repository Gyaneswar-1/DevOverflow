import db from "../../db/db.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { type Request, type Response } from "express"

export const postQuestion = async (
    req: Request | any,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.user
        const { title, description, images, tags } = req.body

        const result = await db.questions.create({
            data: {
                createdBy: id,
                title: title,
                description: description,
                images: images,
                tags: tags,
            },
        })

        return res
            .json(
                new ApiResponse({
                    message: "Hello user",
                    statusCode: 200,
                    success: true,
                }),
            )
            .status(200)
    } catch (error) {
        return res
            .json(
                new ApiResponse({
                    message: "Hello user",
                    data: {},
                    statusCode: 200,
                    success: true,
                }),
            )
            .status(200)
    } finally {
    }
}
