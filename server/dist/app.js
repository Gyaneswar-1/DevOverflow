import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "./helper/logger.js";
import morgan from "morgan";
const app = express();
const morganFormat = ":method :url :status :response-time ms";
app.use(morgan(morganFormat, {
    stream: {
        write: (message) => {
            const logObject = {
                method: message.split(" ")[0],
                url: message.split(" ")[1],
                status: message.split(" ")[2],
                responseTime: message.split(" ")[3],
            };
            logger.info(JSON.stringify(logObject));
        },
    },
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
import healthRoute from "./routes/healthcheck.route.js";
app.use("/api/v1", healthRoute);
import authRoute from "./routes/userAuth.route.js";
app.use("/api/v1/auth", authRoute);
import questionsRoutes from "./routes/questions.route.js";
app.use("/api/v1/questions", questionsRoutes);
export { app };
