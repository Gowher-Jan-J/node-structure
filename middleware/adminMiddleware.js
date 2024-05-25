import { admindbController } from "../DBController/adminDBController.js";

export const adminMiddleware = {};
adminMiddleware.Admin = {
  getAdmin: async () => {
    const fetched = await admindbController.Admin.getAdmin();
    if (fetched != null && fetched != undefined && fetched.length != 0) {
      return fetched;
    } else {
      return "No Data Found";
    }
  },
  createAdmin: async ({ body }) => {
    // const body = req.body;
    // console.log(body);
    const created = await admindbController.Admin.createAdmin(body);
    // console.log("🚀 ~ createAdmin: ~ created:", created);
    if (created != null && created != undefined && created.length != 0) {
      return "Admin Created Successfully";
    } else {
      return "No Data Found";
    }
  },
};
