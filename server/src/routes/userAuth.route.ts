import { Router } from "express"
import { signUp } from "../controllers/auth/signUp.controller.js"
import { signIn } from "../controllers/auth/signIn.controller.js"
import { logout } from "../controllers/auth/logout.controller.js"

const authRoute = Router()
authRoute.post("/signin", signIn)
authRoute.post("/signup",signUp)
authRoute.post("/logout",logout)

export default authRoute
