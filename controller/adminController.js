import { adminMiddleware } from "../middleware/adminMiddleware.js";

export class AdminController {}
AdminController.Admin = {
  getAdmin: async (req, res, next) => {
    adminMiddleware.Admin.getAdmin(req)
      .then((data) => {
        res.status(200).json({ status: "200", data: data });
        next();
      })
      .catch((error) => {
        res.status(500).json({
          message: "Error getting admin",
          error: error,
        });
      });
  },
  createAdmin: async (req, res, next) => {
    adminMiddleware.Admin.createAdmin(req)
      .then((data) => {
        // console.log(data);
        res.status(200).json({ status: "200", message: "success", data: data });
        next();
      })
      .catch((error) => {
        // console.log("error", error);
        res.status(500).json({
          status: "500",
          message: error.message,
        });
      });
  },
};
