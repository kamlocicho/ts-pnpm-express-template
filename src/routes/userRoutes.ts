// src/routes/userRoutes.ts
import { Router } from "express";
import User, { IUser } from "../models/user";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const newUser: IUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error creating user" });
    }
});

export default router;
