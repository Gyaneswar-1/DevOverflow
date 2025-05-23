import { healthCheck } from "../controllers/healthCheck.controller.js";
import { Router } from "express";
import { Apidelay } from "../middleware/Apidelay.middleware.js";
const healthRoute = Router();
healthRoute.get("/healthcheck", Apidelay, healthCheck);
export default healthRoute;
