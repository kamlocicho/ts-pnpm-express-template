// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];
    console.log("authenticating");

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("JWT_SECRET has to be stored in .env variables.");

    if (!token) {
        return res.status(401).json({ error: "Authentication required" });
    }

    try {
        const decodedToken = jwt.verify(token, "your-secret-key-here") as { userId: string };
        req.userId = decodedToken.userId; // Now TypeScript recognizes userId
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};
