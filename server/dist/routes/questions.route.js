import { authMiddleware } from "../middleware/auth.middleware.js";
import { postQuestion } from "../controllers/questions/postQuestion.controller.js";
import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
const questionsRoutes = Router();
questionsRoutes.post("/add", authMiddleware, upload.single("image"), postQuestion);
export default questionsRoutes;
