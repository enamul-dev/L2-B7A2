import { Router } from "express";
import pool from "../db";
const usersRouter = Router();

// Example route
usersRouter.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, username FROM users");
    res.json(result.rows);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Database error:", err.message);
    } else {
      console.error("Unknown error:", err);
    }
    res.status(500).json({ message: "Error fetching users" });
  }
});


// ✅ Export the router so index.ts can import it
export default usersRouter;
