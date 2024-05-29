import jwt from "jsonwebtoken";
import * as Error from "./errorConstant.js";
import { defaultdata } from "./config.js";

export const authentications = {
  generateUserJWT: async (token) => {
    try {
      return jwt.sign(token, defaultdata.configuration.jwtClientSecret, {
        algorithm: "HS256",
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  verifyUserJWT: async (header) => {
    try {
      return jwt.verify(header, defaultdata.configuration.jwtClientSecret);
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
};
