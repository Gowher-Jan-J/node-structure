import express from "express";
import require from "requirejs";
import {
  sequelize,
  user,
  userAuthentication,
  ticket,
} from "../models/models.js";
import { raw } from "mysql2";
const { Op, Sequelize, where } = require("sequelize");

export const userdbController = {};
userdbController.User = {
  createUser: async (data) => {
    try {
      //   console.log(data);
      return await user.create(
        {
          name: data.name,
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

  getUser: async (data, token) => {
    try {
      // console.log("token", token);
      return await user.findOne({
        where: {
          id: token,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "status"],
        },
        raw: true,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  checkemailExists: async (data) => {
    try {
      return await user.findOne({
        where: {
          name: data.name,
        },
        raw: true,
      });
    } catch (error) {
      console.log(error);
      throw Error.InternalError();
    }
  },
  checkUser: async (data) => {
    try {
      return await user.findOne({
        where: {
          id: data.userId,
        },
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  createSession: async (token, device) => {
    try {
      return await userAuthentication.create({
        token: token,
        ipv4: device.ip || device.ipv,
        userAgent: device.userAgent,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  findSession: async (token) => {
    try {
      return await userAuthentication.findOne({
        where: {
          token: token,
        },
      });
    } catch (error) {
      return null;
    }
  },
  createBooking: async (data) => {
    try {
      //   console.log(data);
      return await ticket.create(
        {
          event_id: data.event_id,
          user_id: data.user_id,
          number_of_tickets: data.number_of_tickets,
          price: data.price,
        },
        { raw: true }
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  checUserExists: async (data, token) => {
    try {
      // console.log(token);
      return await user.findOne({
        where: {
          id: token,
        },
        raw: true,
      });
    } catch (error) {
      console.log(error);
      throw Error.InternalError();
    }
  },
  fetchAllTickets: async (data, token) => {
    try {
      return await ticket.findAll({
        where: {
          user_id: token,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "status"],
        },
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
};
