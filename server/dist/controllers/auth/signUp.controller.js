import { ApiResponse } from "../../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../../db/db.js";
import { validatedEnv } from "../../helper/zodENVvalidation.js";
import logger from "../../helper/logger.js";
import { userSigninSchema } from "../../validations/userSignin.validation.js";
export const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        const validationResult = userSigninSchema.safeParse({ email, password });
        if (validationResult.error) {
            logger.error(validationResult.error);
            return res.json(new ApiResponse({
                message: "Validation Error",
                data: validationResult.error.flatten().fieldErrors,
                statusCode: 500,
                success: false,
            }));
        }
        const isExists = await db.user.findUnique({
            where: {
                email: email,
            },
        });
        logger.info(isExists?.email);
        if (isExists === null) {
            return res
                .json(new ApiResponse({
                message: "either email did not exist try Signup",
                statusCode: 500,
                success: false,
            }))
                .status(500);
        }
        const passwordCompare = await bcrypt.compare(password, isExists.password);
        if (passwordCompare) {
            const token = jwt.sign({ id: isExists.id, email: email, userID: isExists.userID }, validatedEnv.JWT_SECRET, { algorithm: "HS256" });
            res.cookie("token", `Bearer ${token}`, {
                httpOnly: true,
                secure: validatedEnv.NODE_ENV === "development",
                sameSite: "lax",
                maxAge: 24 * 60 * 60 * 1000,
            });
            return res.json(new ApiResponse({
                message: "user signUp success",
                statusCode: 200,
                success: true,
            }));
        }
        else {
            return res.json(new ApiResponse({
                message: "either email or password wrong",
                statusCode: 400,
                success: false,
            }));
        }
    }
    catch (error) {
        logger.error(error);
        return res.json(new ApiResponse({
            message: "somthing went wrong",
            data: error,
            statusCode: 500,
            success: false,
        }));
    }
    finally {
        db.$disconnect();
    }
};
