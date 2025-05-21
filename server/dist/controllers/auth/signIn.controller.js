import { ApiResponse } from "../../utils/ApiResponse.js";
export const signIn = (req, res) => {
    try {
        const { email, password } = req.body;
        res
            .json(new ApiResponse({
            message: "Login success",
            statusCode: 200,
            data: { email, password },
        }))
            .status(200);
    }
    catch (error) { }
};
