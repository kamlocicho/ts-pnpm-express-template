// src/db.ts
import mongoose from "mongoose";
import logger from "./utils/logger";

const connectDb = () => {
    const dbUri = process.env.MONGODB_URI; // Change to your MongoDB URI
    if (!dbUri) throw new Error("MONGODB_URI is requested in env variables.");

    mongoose.connect(dbUri, {
        serverSelectionTimeoutMS: 10000, // Increase the timeout
    });

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", () => {
        logger.info("Connected to MongoDB");
    });
};

export default connectDb;
