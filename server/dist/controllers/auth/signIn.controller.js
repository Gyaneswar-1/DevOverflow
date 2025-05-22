import { ApiResponse } from "../../utils/ApiResponse.js";
import db from "../../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validatedEnv } from "../../helper/zodENVvalidation.js";
import logger from "../../helper/logger.js";
import { userSignupSchema } from "../../validations/userSignup.validation.js";
export const signIn = async (req, res) => {
    try {
        const { email, password, userID, fullName } = req.body;
        const validateSignin = userSignupSchema.safeParse({
            email,
            password,
            userID,
            fullName,
        });
        if (validateSignin.error) {
            logger.error(validateSignin.error);
            return res.status(500).json(new ApiResponse({
                message: "Validation error",
                statusCode: 500,
                data: validateSignin.error.flatten().fieldErrors,
                success: false,
            }));
        }
        const isExistEmail = await db.user.findUnique({
            where: {
                email: email,
            },
        });
        if (isExistEmail?.email === email) {
            return res
                .json(new ApiResponse({
                message: "Email already Exists",
                statusCode: 204,
            }))
                .status(204);
        }
        const isExistUserID = await db.user.findUnique({
            where: {
                userID: userID,
            },
        });
        if (isExistUserID?.userID === userID) {
            return res
                .json(new ApiResponse({
                message: "UserID already Exists",
                statusCode: 204,
            }))
                .status(204);
        }
        const encodedPassword = await bcrypt.hash(password, 12);
        const result = await db.user.create({
            data: {
                email: email,
                password: encodedPassword,
                userID: userID,
                fullName: fullName,
            },
        });
        const token = jwt.sign({ id: result.id, email: result.email, userID: result.userID }, validatedEnv.JWT_SECRET, { algorithm: "HS256" });
        res.cookie("token", `Bearer ${token}`, {
            httpOnly: true,
            secure: validatedEnv.NODE_ENV === "development",
            sameSite: "lax",
        });
        return res
            .json(new ApiResponse({ message: "Login success", statusCode: 200, data: { fullName }, })).status(200);
    }
    catch (error) {
        logger.error(error);
        return res
            .json(new ApiResponse({
            message: "error in signin",
            statusCode: 503,
            data: error,
            success: false,
        }))
            .status(503);
    }
    finally {
        db.$disconnect();
    }
};
