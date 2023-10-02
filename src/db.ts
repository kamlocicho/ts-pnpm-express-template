// src/db.ts
import mongoose from "mongoose";

const dbUri = process.env.MONGODB_URI; // Change to your MongoDB URI
if (!dbUri) throw new Error("MONGODB_URI is requested in env variables.");

mongoose.connect(dbUri);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

export default mongoose;
