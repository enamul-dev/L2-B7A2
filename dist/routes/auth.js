"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../db"));
const dotenv_1 = __importDefault(require("dotenv")); // ✅ load env
dotenv_1.default.config();
const authRouter = (0, express_1.Router)();
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret"; // ✅ safe fallback
const SALT_ROUNDS = 10;
// Register route
authRouter.post("/register", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, SALT_ROUNDS);
        await db_1.default.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hashedPassword]);
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (err) {
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
        const result = await db_1.default.query("SELECT * FROM users WHERE username = $1", [username]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const user = result.rows[0];
        console.log("DB user:", user); // ✅ debug
        const validPassword = await bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user: { id: user.id, username: user.username } });
    }
    catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Error logging in" });
    }
});
exports.default = authRouter;
