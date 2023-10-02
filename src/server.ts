// src/server.ts
import express from "express";
import mongoose from "./db";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Hello, Express!");
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
