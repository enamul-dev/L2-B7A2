import { Router } from "express";
import pool from "../db";
import bcrypt from "bcrypt";

const usersRouter = Router();

// Register new user
usersRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hash password with salt rounds (8–12, usually 10)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2)",
      [username, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    if (err instanceof Error) {
      console.error("Database error:", err.message);
    }
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login user
usersRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = result.rows[0];

    // Compare plain password with hashed password
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      res.json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error("Database error:", err.message);
    }
    res.status(500).json({ message: "Error logging in" });
  }
});

usersRouter.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, username FROM users");
    res.json(result.rows);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Database error:", err.message);
    }
    res.status(500).json({ message: "Error fetching users" });
  }
});


export default usersRouter;
