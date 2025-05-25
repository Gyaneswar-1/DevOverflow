import { ApiResponse } from "../../utils/ApiResponse.js"
import type { Request, Response } from "express"

export const isAuthenticated = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        return res.status(200).json(
            new ApiResponse({
                message: "user authorized",
                statusCode: 200,
                success: true,
            }),
        )
    } catch (error) {
        return res.status(500).json(
            new ApiResponse({
                message: "user is not authorized",
                statusCode: 500,
                success: false,
            }),
        )
    }
}
