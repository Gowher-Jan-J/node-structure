import exp from "constants";
import { Router } from "express";
import {
  UserController,
  UserAuthenticate,
} from "../controller/userController.js";
const userRouter = Router();

userRouter.get("/getUser", UserAuthenticate, UserController.User.getUser);
userRouter.post("/createUser", UserController.User.createUser);
userRouter.post("/login", UserController.User.login);
userRouter.post("/book", UserAuthenticate, UserController.User.book);
userRouter.get("/bookings", UserAuthenticate, UserController.User.listBookings);

export { userRouter };
