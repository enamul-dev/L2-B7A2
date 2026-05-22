"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Mount routers
app.use("/auth", auth_1.default);
app.use("/users", users_1.default);
// Root route
app.get("/", (req, res) => {
    res.send("API is running 🚀");
});
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
