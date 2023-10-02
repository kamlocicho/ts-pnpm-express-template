// src/routes/protectedRoutes.ts
import { Router } from "express";
import { authenticateUser } from "../middleware/authMiddleware";

const router = Router();

// Protected route (example)
router.get("/", authenticateUser, (req, res) => {
    res.json({ message: "This is a protected route", userId: req.userId });
});

export default router;
