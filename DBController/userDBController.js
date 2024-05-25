import express from "express";
import require from "requirejs";
import { sequelize, admin } from "../models/models.js";
import { raw } from "mysql2";
const { Op, Sequelize, where } = require("sequelize");

export const userdbController = {};
userdbController.User = {
  createUser: async (data) => {
    try {
      //   console.log(data);
      return await user.create(
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

  getUser: async (data) => {
    try {
      return await user.findAll({
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
