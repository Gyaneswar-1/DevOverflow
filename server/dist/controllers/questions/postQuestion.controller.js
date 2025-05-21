import { ApiResponse } from "../../utils/ApiResponse.js";
export const postQuestion = async (req, res) => {
    try {
        const { id, email, userID } = req.user;
        const u = req.body;
        return res
            .json(new ApiResponse({
            message: "Hello user",
            data: { id, email, userID, u },
            statusCode: 200,
            success: true,
        }))
            .status(200);
    }
    catch (error) {
        return res
            .json(new ApiResponse({
            message: "Hello user",
            data: {},
            statusCode: 200,
            success: true,
        }))
            .status(200);
    }
    finally {
    }
};
