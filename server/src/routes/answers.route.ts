import { Router } from "express"
import { postAnswer } from "../controllers/answers/postAnswer.controller.js"
import { Apidelay } from "../middleware/Apidelay.middleware.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { getAnswer } from "../controllers/answers/getAnswer.controller.js"
import { getAnswerByUser } from "../controllers/answers/getByUserId.controller.js"

const answerRouter = Router()
answerRouter.post("/post",Apidelay,authMiddleware,postAnswer)
answerRouter.get("/get",Apidelay,authMiddleware,getAnswer)
answerRouter.get("/user-get",Apidelay,authMiddleware,getAnswerByUser)

export default answerRouter
