import { Router } from "express";
import pool from "../db";
import { verifyToken, AuthRequest } from "../middleware/auth";

const usersRouter = Router();

// Protected route: get all users
usersRouter.get("/", verifyToken, async (req: AuthRequest, res) => {
  try {
    const result = await pool.query("SELECT id, username FROM users");
    res.json({ users: result.rows, requestedBy: req.user });
  } catch (err) {
    if (err instanceof Error) {
      console.error("Database error:", err.message);
    }
    res.status(500).json({ message: "Error fetching users" });
  }
});
usersRouter.get("/", verifyToken, async (req: AuthRequest, res) => {
  try {
    const result = await pool.query("SELECT id, username FROM users");
    res.json({ users: result.rows, requestedBy: req.user });
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});
export default usersRouter;
