import { authMiddleware } from "../middleware/auth.middleware.js";
import { postQuestion } from "../controllers/questions/postQuestion.controller.js";
import { Router } from "express";
const questionsRoutes = Router();
questionsRoutes.post("/add", authMiddleware, postQuestion);
export default questionsRoutes;
