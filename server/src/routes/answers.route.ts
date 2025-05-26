import { Router } from "express"
import { postAnswer } from "../controllers/answers/postAnswer.controller.js"
import { Apidelay } from "../middleware/Apidelay.middleware.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const answerRouter = Router()
answerRouter.post("/post",Apidelay,authMiddleware,postAnswer)

export default answerRouter
