import { signIn } from "../controllers/auth/signIn.controller.js"

import { Router } from "express"
const authRoute = Router()
authRoute.post("/signin", signIn)

export default authRoute
