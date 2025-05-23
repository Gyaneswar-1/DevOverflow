import { Router } from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { deleteProfile } from "../controllers/profile/deleteProfile.controller.js"
import { getProfile } from "../controllers/profile/getProfile.controller.js"

const userProfileRouter = Router()

userProfileRouter.delete("/delete", authMiddleware, deleteProfile)
userProfileRouter.get("/get", authMiddleware, getProfile)

export default userProfileRouter
