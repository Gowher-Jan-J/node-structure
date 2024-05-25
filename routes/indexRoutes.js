import { Router } from "express";
import { adminRouter } from "./adminRoutes.js";
import { userRouter } from "./userRoutes.js";

const indexRouter = Router();

indexRouter.use("/admin", adminRouter);
indexRouter.use("/user", userRouter);

export { indexRouter };
