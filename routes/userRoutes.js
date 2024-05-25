import exp from "constants";
import { Router } from "express";
import { UserController } from "../controller/userController.js";
const userRouter = Router();

userRouter.get("/", UserController.User.getUser);
userRouter.post("/createAdmin", UserController.User.createUser);

export { userRouter };
