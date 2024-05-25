import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("JMart", "root", "", {
  host: "localhost",
  dialect: "mysql", // Change as needed
  logging: false,
});
const admin = sequelize.define(
  "admin",
  {
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "admin",
  }
);

export { sequelize, admin };
