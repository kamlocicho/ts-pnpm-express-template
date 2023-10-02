// src/routes/authRoutes.ts
import { Router } from "express";
import User, { IUser } from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import CustomError from "../errors/customError";

const router = Router();

// User registration route
router.post("/register", async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new CustomError("User already exists", 400);
        }

        // Create a new user
        const newUser: IUser = new User({ username, email, password });
        await newUser.save();

        // Create and send a JWT token upon successful registration
        const token = jwt.sign({ userId: newUser._id }, "your-secret-key-here", {
            expiresIn: "1h", // Token expiration time (adjust as needed)
        });

        return res.status(201).json({ token });
    } catch (error) {
        next(error);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            throw new CustomError("Authentication failed", 401);
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Authentication failed" });
        }

        // Create and send a JWT token upon successful login
        const token = jwt.sign({ userId: user._id }, "your-secret-key-here", {
            expiresIn: "1h", // Token expiration time (adjust as needed)
        });

        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

export default router;
