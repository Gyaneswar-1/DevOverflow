import { authMiddleware } from "../middleware/auth.middleware.js";
import { deleteProfile } from "../controllers/profile/deleteProfile.controller.js";
import { Router } from "express";
const userProfileRouter = Router();
userProfileRouter.delete("/delete", authMiddleware, deleteProfile);
export default userProfileRouter;
