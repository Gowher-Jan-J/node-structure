import { userMiddeleware } from "../middleware/userMiddleware.js";

export class UserController {}
UserController.User = {
  getUser: async (req, res, next) => {
    userMiddeleware.Admin.getUser(req)
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
  createUser: async (req, res, next) => {
    userMiddeleware.Admin.createUser(req)
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
