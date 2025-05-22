import logger from "../../helper/logger.js"
import { type Request, type Response } from "express"

export const logout = async (req: Request, res: Response):Promise<any> => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
        })
        return res.status(200).json({
            message: "Logout successful",
            statusCode: 200,
            success: true,
        })
    } catch (error) {
        logger.error("error clearing cookie", error)
        return res.status(500).json({
            message: "Internal server error",
            statusCode: 500,
            success: false,
            data: error,
        })
    } finally {

    }
}
