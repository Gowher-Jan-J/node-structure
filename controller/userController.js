import { userMiddeleware } from "../middleware/userMiddleware.js";

export class UserController {}
UserController.User = {
  /**
   * @name get  user
   * @param {*} token
   */
  getUser: async (req, res) => {
    userMiddeleware.User.getUser(req)
      .then((data) => {
        res.status(200).json({ status: "200", data: data });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Error getting admin",
          error: error,
        });
      });
  },

  /**
   * @name create  user
   * @param {*} body
   */

  createUser: async (req, res) => {
    userMiddeleware.User.createUser(req)
      .then((data) => {
        res.status(200).json({ status: "200", message: "success", data: data });
        // next(); // Remove this line
      })
      .catch((error) => {
        res.status(500).json({
          status: "500",
          message: error.message,
        });
      });
  },

  /**
   * @name login  user
   * @param {*} body
   */

  login: async (req, res, next) => {
    const ipv4 = req.socket.remoteAddress?.split("f:")[1];
    const ipv = req.socket.remoteAddress;
    const browser = req.get("User-Agent");
    const deviceInfo = { ip: ipv4, ipv: ipv, userAgent: browser };
    userMiddeleware.User.login(req, deviceInfo)
      .then((data) => {
        // console.log(data);
        res.status(200).json({ status: "200", message: "success", data: data });
      })
      .catch((error) => {
        console.log("error", error);
        res.status(500).json({
          status: "500",
          message: error.message,
        });
      });
  },
  /**
   * @name create bookings
   * @param {*} token
   */
  book: async (req, res) => {
    userMiddeleware.User.bookTicket(req)
      .then((data) => {
        res.status(200).json({ status: "200", message: "success", data: data });
        // next(); // Remove this line
      })
      .catch((error) => {
        res.status(500).json({
          status: "500",
          message: error.message,
        });
      });
  },
  /**
   * @name get All bookings
   * @param {*} token
   */

  listBookings: async (req, res) => {
    userMiddeleware.User.fetchAllTickets(req)
      .then((data) => {
        res.status(200).json({ status: "200", message: "success", data: data });
        // next(); // Remove this line
      })
      .catch((error) => {
        res.status(500).json({
          status: "500",
          message: error.message,
        });
      });
  },
};
/**
 * @name create bookings
 * @param {*} token
 */
export const UserAuthenticate = async (req, res, next) => {
  userMiddeleware.User.verify(req)
    .then((data) => {
      // console.log(data);
      req.token = data;
      next();
    })
    .catch((error) => {
      // console.log(error.message);
      res.status(500).json({ status: "500", message: error.message });
    });
};
