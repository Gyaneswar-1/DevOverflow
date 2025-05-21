import { type Response, type Request } from "express"
import { ApiResponse } from "../../utils/ApiResponse.js"
import db from "../../db/db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { validatedEnv } from "../../helper/zodENVvalidation.js"

export const signIn = async (req: Request, res: Response):Promise<any> => {
    try {
        const { email, password, userID, fullName } = req.body

        const isExistEmail = await db.user.findUnique({
            where: {
                email: email,
            },
        })
        
        if (isExistEmail?.email===email) {
            return res
                .json(
                    new ApiResponse({
                        message: "Email already Exists",
                        statusCode: 204,
                    }),
                )
                .status(204)
        }

        const isExistUserID = await db.user.findUnique({
            where: {
                userID: userID,
            },
        })

        if (isExistUserID?.userID===userID) {
            return res
                .json(
                    new ApiResponse({
                        message: "UserID already Exists",
                        statusCode: 204,
                    }),
                )
                .status(204)
        }

        const encodedPassword = await bcrypt.hash(password, 12)

        const result = await db.user.create({
            data: {
                email: email,
                password: encodedPassword,
                userID: userID,
                fullName: fullName,
            },
        })

        const token = jwt.sign(
            { email: result.email, userID: result.userID },
            validatedEnv.JWT_SECRET,
            { algorithm: "HS256" },
        )

        res.cookie("token", `Bearer ${token}`, {
            httpOnly: true,
            secure: validatedEnv.NODE_ENV === "development",
            sameSite: "lax",
        })

        return res
            .json(
                new ApiResponse({
                    message: "Login success",
                    statusCode: 200,
                    data: { fullName },
                }),
            )
            .status(200)
    } catch (error) {
        return res
            .json(
                new ApiResponse({
                    message: "error in signin",
                    statusCode: 503,
                    data: error,
                }),
            )
            .status(503)
    } finally {
        db.$disconnect()
    }
}
