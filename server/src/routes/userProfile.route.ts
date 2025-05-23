import { Router } from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { deleteProfile } from "../controllers/profile/deleteProfile.controller.js"
import { getProfile } from "../controllers/profile/getProfile.controller.js"
import { Apidelay } from "../middleware/Apidelay.middleware.js"


const userProfileRouter = Router()

userProfileRouter.delete("/delete",Apidelay, authMiddleware, deleteProfile)
userProfileRouter.get("/get",Apidelay, authMiddleware, getProfile)

export default userProfileRouter
