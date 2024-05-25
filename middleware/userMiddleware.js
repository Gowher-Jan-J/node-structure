import { userdbController } from "../DBController/userDBController.js";

export const userMiddeleware = {};
userMiddeleware.Admin = {
  getUser: async () => {
    const fetched = await userdbController.User.getUser();
    if (fetched != null && fetched != undefined && fetched.length != 0) {
      return fetched;
    } else {
      return "No Data Found";
    }
  },
  createUser: async ({ body }) => {
    // const body = req.body;
    // console.log(body);
    const created = await userdbController.User.createUser(body);
    // console.log("🚀 ~ createAdmin: ~ created:", created);
    if (created != null && created != undefined && created.length != 0) {
      return "Admin Created Successfully";
    } else {
      return "No Data Found";
    }
  },
};
