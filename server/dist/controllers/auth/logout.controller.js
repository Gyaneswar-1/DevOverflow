import logger from "../../helper/logger.js";
export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
        });
        return res.status(200).json({
            message: "Logout successful",
            statusCode: 200,
            success: true,
        });
    }
    catch (error) {
        logger.error("error clearing cookie", error);
        return res.status(500).json({
            message: "Internal server error",
            statusCode: 500,
            success: false,
            data: error,
        });
    }
    finally {
    }
};
