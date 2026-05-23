import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db";
import dotenv from "dotenv";   // ✅ load env
dotenv.config();

const authRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret"; // ✅ safe fallback
const SALT_ROUNDS = 10;

// Register route
authRouter.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2)",
      [username, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login route
authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];
    console.log("DB user:", user); // ✅ debug

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Error logging in" });
  }
});

export default authRouter;
