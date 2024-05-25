import exp from "constants";
import { Router } from "express";
const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("Hello World!");
});
userRouter.post("/", (req, res) => {
  res.send("Hello World!");
});

export { userRouter };
