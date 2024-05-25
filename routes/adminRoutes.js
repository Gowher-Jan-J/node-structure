import { Router } from "express";
import { AdminController } from "../controller/adminController.js";

const adminRouter = Router();

adminRouter.get("/", AdminController.Admin.getAdmin);
adminRouter.post("/createAdmin", AdminController.Admin.createAdmin);

export { adminRouter };
