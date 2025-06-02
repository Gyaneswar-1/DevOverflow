import type { Request, Response } from "express"
import db from "../../db/db.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import logger from "../../helper/logger.js"
import fs from "fs"
import { profileUpdateSchema } from "../../validations/profile.validation.js"
import imagekit from "../../config/imageKit.js"

export const editProfile = async (
    req: Request | any,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.user
        const { fullName, userID, city, email, country, bio } = req.body
        logger.info(
            "Editing profile for user ID:",
            id,
            fullName,
            userID,
            city,
            email,
            country,
            bio,
        )
        const validationResult = profileUpdateSchema.safeParse({
            fullName,
            userID,
            city,
            email,
            country,
            bio,
        })

        if (!validationResult.success) {
            return res.status(400).json(
                new ApiResponse({
                    message: "Validation failed",
                    statusCode: 400,
                    success: false,
                    data: validationResult.error.errors,
                }),
            )
        }

        const user = await db.user.findUnique({
            where: { id: id },
        })
        if (!user) {
            return res.status(404).json(
                new ApiResponse({
                    message: "User not found",
                    statusCode: 404,
                    success: false,
                }),
            )
        }

        if (userID && userID !== user.userID) {
            const existingUser = await db.user.findUnique({
                where: { userID },
            })
            if (existingUser) {
                return res.status(409).json(
                    new ApiResponse({
                        message: "UserID already exists",
                        statusCode: 409,
                        success: false,
                    }),
                )
            }
        }

        if (email && email !== user.email) {
            const existingUser = await db.user.findUnique({
                where: { email },
            })
            if (existingUser) {
                return res.status(409).json(
                    new ApiResponse({
                        message: "Email already exists",
                        statusCode: 409,
                        success: false,
                    }),
                )
            }
        }

        let response = null
        if (req.file && req.file.path) {
            if (user.profileImgId) {
                const existingImage = await db.images.findUnique({
                    where: { id: user.profileImgId },
                })
                if (existingImage?.fileId) {
                    try {
                        await imagekit.deleteFile(existingImage.fileId)
                        await db.images.delete({
                            where: { id: user.profileImgId },
                        })
                    } catch (error) {
                        logger.error("Error deleting existing image", error)
                    }
                }
            }

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

        let result

        if (response) {
            let profileImageId = user.profileImgId

            if (user.profileImgId) {
                const existingImageRecord = await db.images.findUnique({
                    where: { id: user.profileImgId },
                })

                if (existingImageRecord) {
                    await db.images.update({
                        where: {
                            id: user.profileImgId,
                        },
                        data: {
                            url: response.url,
                            fileId: response.fileId,
                        },
                    })
                } else {
                    const newProfileImage = await db.images.create({
                        data: {
                            url: response.url,
                            fileId: response.fileId,
                        },
                    })
                    profileImageId = newProfileImage.id
                }
            } else {
                const newProfileImage = await db.images.create({
                    data: {
                        url: response.url,
                        fileId: response.fileId,
                    },
                })

                profileImageId = newProfileImage.id
            }
            result = await db.user.update({
                where: { id: id },
                data: {
                    fullName: fullName || user.fullName,
                    userID: userID || user.userID,
                    city: city || user.city,
                    email: email || user.email,
                    country: country || user.country,
                    bio: bio || user.bio,
                    profileImgId: profileImageId,
                },
            })
        } else {
            result = await db.user.update({
                where: { id: id },
                data: {
                    fullName: fullName || user.fullName,
                    userID: userID || user.userID,
                    city: city || user.city,
                    email: email || user.email,
                    country: country || user.country,
                    bio: bio || user.bio,
                },
            })
        }
        return res.status(200).json(
            new ApiResponse({
                message: "Operation completed successfully",
                data: result,
                statusCode: 200,
                success: true,
            }),
        )
    } catch (error) {
        logger.error(error)
        return res.status(500).json(
            new ApiResponse({
                message: "Internal server error",
                statusCode: 500,
                success: false,
            }),
        )
    } finally {
        db.$disconnect()
    }
}
