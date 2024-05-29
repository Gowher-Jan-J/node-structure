import require from "requirejs";
var CryptoJS = require("crypto-js");
import { userdbController } from "../DBController/userDBController.js";
import { defaultdata } from "../utils/config.js";
import { authentications } from "../utils/jwt.js";
import { PayloadCompiler } from "../utils/payloader.js";
import * as Error from "../utils/errorConstant.js";

export const userMiddeleware = {};
userMiddeleware.User = {
  getUser: async ({ body, token }) => {
    body.id = token;
    const fetched = await userdbController.User.getUser(body, token);
    // console.log(fetched);
    if (fetched != null && fetched != undefined && fetched.length != 0) {
      return fetched;
    } else {
      return "Invalid token";
    }
  },
  createUser: async ({ body }) => {
    // const body = req.body;
    // console.log(body);
    const passwordSecret = defaultdata.configuration.passwordSecret;
    body.password = CryptoJS.AES.encrypt(
      body.password,
      passwordSecret
    ).toString();
    const created = await userdbController.User.createUser(body);
    // console.log("🚀 ~ createAdmin: ~ created:", created);
    if (created != null && created != undefined && created.length != 0) {
      return "User Created Successfully";
    } else {
      return "Failed to Create User";
    }
  },
  login: async ({ body }, device) => {
    const validated = await PayloadCompiler.compile(body, "userLogin");
    // const password = CryptoJS.AES.decrypt(validated.data.password)
    const userFound = await userdbController.User.checkemailExists(
      validated.data
    );
    // console.log("🚀 ~ email_login: ~  userFound:", userFound)
    const passwordSecret = defaultdata.configuration.passwordSecret;
    if (!userFound || Object.keys(userFound).length === 0) {
      //no user available shouldnt be displayed to user
      return "Wrong Email/Password. Try Again!";
    } else if (userFound.status === "inactive") {
      throw Error.SomethingWentWrong("Account InActive");
    } else if (userFound.status === "active") {
      const plain = CryptoJS.AES.decrypt(userFound.password, passwordSecret);
      // console.log("🚀 ~ email_login: ~ userFound:", userFound)
      const decrypted = plain.toString(CryptoJS.enc.Utf8);
      if (decrypted === body.password) {
        // console.log("🚀 ~ email_login: ~ userFound.id:", userFound.id)
        const token = await authentications.generateUserJWT({
          userId: userFound.id,
          status: "active",
        });

        if (token) {
          var encryptedToken = CryptoJS.AES.encrypt(
            token,
            passwordSecret
          ).toString();
          const addSession = await userdbController.User.createSession(
            encryptedToken,
            device
          );
          if (addSession != null && addSession != undefined) {
            // console.log("🚀 ~ email_login: ~  userFound.userName:", userFound.fullName)
            return { token: encryptedToken };
          } else {
            throw Error.SomethingWentWrong();
          }
        } else {
          throw Error.SomethingWentWrong();
        }
      } else {
        throw Error.SomethingWentWrong("Wrong Email/Password. Try Again!");
      }
    } else {
      throw Error.SomethingWentWrong();
    }
  },
  bookTicket: async ({ body, token }) => {
    if (token == null || token == undefined || token == "") {
      return "Invalid token";
    }

    body.user_id = token;
    // console.log(token);
    const fetched = await userdbController.User.checUserExists(body, token);
    if (fetched != null && fetched != undefined && fetched.length != 0) {
      const created = await userdbController.User.createBooking(body);
      if (created != null && created != undefined && created.length != 0) {
        return "Tickets Booked Successfully";
      } else {
        return "Failed to Book Tickets";
      }
    } else {
      return "User Not Found";
    }
  },

  verify: async ({ headers }) => {
    var isMalicious = true;
    const passwordSecret = defaultdata.configuration.passwordSecret;
    if (headers.hasOwnProperty("usertoken")) {
      const findSession = await userdbController.User.findSession(
        headers.usertoken
      );

      if (
        findSession != null &&
        findSession != undefined &&
        Object.keys(findSession).length != 0
      ) {
        var plain = CryptoJS.AES.decrypt(findSession.token, passwordSecret);
        findSession.token = plain.toString(CryptoJS.enc.Utf8);

        const decoded = await authentications.verifyUserJWT(findSession.token);

        if (
          decoded != null &&
          decoded != undefined &&
          decoded.status == "active"
        ) {
          const foundUser = await userdbController.User.checkUser(decoded);

          if (
            foundUser != null &&
            foundUser != undefined &&
            Object.keys(foundUser).length != 0
          ) {
            return foundUser.id;
          } else {
            throw Error.AuthenticationFailed("UnAuthorized");
          }
        } else {
          throw Error.AuthenticationFailed("UnAuthorized");
        }
      } else {
        throw Error.AuthenticationFailed("UnAuthorized");
      }
    }
    if (isMalicious) {
      return false;
    }
  },
  fetchAllTickets: async ({ token, body }) => {
    body.user_id = token;
    if (token == null || token == undefined || token == "") {
      return "Invalid token";
    }
    const fetched = await userdbController.User.fetchAllTickets(body, token);
    if (fetched != null && fetched != undefined && fetched.length != 0) {
      return fetched;
    } else {
      return "Failed to Fetch Tickets";
    }
  },
};
