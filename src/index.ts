import express from "express";
import authRouter from "./routes/auth";
import usersRouter from "./routes/users";

const app = express();

// Middleware
app.use(express.json());

// Mount routers
app.use("/auth", authRouter);
app.use("/users", usersRouter);

// Root route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
