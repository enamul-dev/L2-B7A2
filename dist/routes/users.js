"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db"));
const auth_1 = require("../middleware/auth");
const usersRouter = (0, express_1.Router)();
// Protected route: get all users
usersRouter.get("/", auth_1.verifyToken, async (req, res) => {
    try {
        const result = await db_1.default.query("SELECT id, username FROM users");
        res.json({ users: result.rows, requestedBy: req.user });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("Database error:", err.message);
        }
        res.status(500).json({ message: "Error fetching users" });
    }
});
usersRouter.get("/", auth_1.verifyToken, async (req, res) => {
    try {
        const result = await db_1.default.query("SELECT id, username FROM users");
        res.json({ users: result.rows, requestedBy: req.user });
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching users" });
    }
});
exports.default = usersRouter;
