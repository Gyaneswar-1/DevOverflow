import { signUp } from "../controllers/auth/signUp.controller.js";
import { signIn } from "../controllers/auth/signIn.controller.js";
import { Router } from "express";
const authRoute = Router();
authRoute.post("/signin", signIn);
authRoute.post("/signup", signUp);
export default authRoute;
