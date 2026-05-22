"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersRouter = (0, express_1.Router)();
// Example route
usersRouter.get("/", (req, res) => {
    res.send("List of users");
});
// ✅ Export the router so index.ts can import it
exports.default = usersRouter;
