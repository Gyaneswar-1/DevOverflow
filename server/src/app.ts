import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// import healthCheck from "./routes/healthcheck.route.js";
// app.use("/api/v1/", healthCheck);
import authRoute from "./routes/userAuth.route.js";
app.use("/api/v1/auth", authRoute);

export { app };
