import { authMiddleware } from "../middleware/auth.middleware.js"
import { postQuestion } from "../controllers/questions/postQuestion.controller.js"
import { Router } from "express"
import { upload } from "../middleware/multer.middleware.js"
import { getQuestions } from "../controllers/questions/getQuestions.controller.js"
import { getQuestionsById } from "../controllers/questions/getQuestionsById.controller.js"
import { deleteQuestion } from "../controllers/questions/deleteQuestions.controller.js"
import { Apidelay } from "../middleware/Apidelay.middleware.js"


const questionsRoutes = Router()
questionsRoutes.post(
    "/add",
    authMiddleware,
    upload.single("image"),
    postQuestion,
)
questionsRoutes.get("/get",Apidelay, authMiddleware, getQuestions)
questionsRoutes.get("/get/:id",Apidelay, authMiddleware, getQuestionsById)
questionsRoutes.delete("/delete/:qid",Apidelay, authMiddleware, deleteQuestion)

export default questionsRoutes
