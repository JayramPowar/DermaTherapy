import express from "express";
import cors from "cors";
import { router } from "./routes/router.js";
import { ErrorHandler } from "./controller/ErrorController.js";

export const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_API_ORIGIN_URL, // Reflects the request origin, as defined by req.header('Origin')
    optionsSuccessStatus: 200,
    credentials: true
};

const CORS = cors(corsOptions);

// CORS Configuration Middleware for Server
app.use(CORS);

// Hadles JSON Requests
app.use(express.json({ limit: '50mb' }));

// Middleware to parse incoming URL-encoded data (e.g., form submissions)
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Use the imported router to handle application routes
app.use(router);

// 404 Error handler for unknown routes
app.use(ErrorHandler);