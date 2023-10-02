// src/server.ts
import express from "express";
import connectDb from "./db";
import authRoutes from "./routes/authRoutes";
import protectedRoutes from "./routes/protectedRoutes";
import dotenv from "dotenv";
import { authenticateUser } from "./middleware/authMiddleware";
import { errorHandler } from "./middleware/errorMiddleware";
import logger from "./utils/logger";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/protected", authenticateUser, protectedRoutes);

app.get("/", (req, res) => {
    res.send("Hello, Express!");
});

app.use(errorHandler);

app.listen(port, () => {
    logger.info(`Server is listening on port ${port}`);
    connectDb();
});
