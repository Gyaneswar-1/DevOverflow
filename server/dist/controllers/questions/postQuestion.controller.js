import db from "../../db/db.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import imagekit from "../../config/imageKit.js";
import fs from "fs";
export const postQuestion = async (req, res) => {
    try {
        const { id } = req.user;
        const { title, description, tags } = req.body;
        const filePath = req.file.path;
        const fileBuffer = fs.readFileSync(filePath);
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: req.file.originalname,
        });
        fs.unlinkSync(filePath);
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
        });
        return res
            .json(new ApiResponse({
            message: "Hello user",
            statusCode: 200,
            success: true,
            data: result,
        }))
            .status(200);
    }
    catch (error) {
        return res
            .json(new ApiResponse({
            message: "Error happen",
            data: { error },
            statusCode: 200,
            success: false,
        }))
            .status(200);
    }
    finally {
    }
};
