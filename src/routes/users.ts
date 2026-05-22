import { Router } from "express";

const usersRouter = Router();

// Example route
usersRouter.get("/", (req, res) => {
  res.send("List of users");
});

// ✅ Export the router so index.ts can import it
export default usersRouter;
