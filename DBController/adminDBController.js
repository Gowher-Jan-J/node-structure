import express from "express";
import require from "requirejs";
import { sequelize, admin } from "../models/models.js";
import { raw } from "mysql2";
const { Op, Sequelize, where } = require("sequelize");

export const admindbController = {};
admindbController.Admin = {
  createAdmin: async (data) => {
    try {
      //   console.log(data);
      return await admin.create(
        {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
          password: data.password,
        },
        { raw: true }
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getAdmin: async (data) => {
    try {
      return await admin.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        raw: true,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
