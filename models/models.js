import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("tickets", "root", "", {
  host: "localhost",
  dialect: "mysql", // Change as needed
  logging: false,
});

const user = sequelize.define(
  "user",
  {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    freezeTableName: true,
    tableName: "user",
  }
);

const userAuthentication = sequelize.define(
  "userAuthentication",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ipv4: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "userAuthentication",
  }
);

const ticket = sequelize.define(
  "ticket",
  {
    event_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },
    number_of_tickets: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    freezeTableName: true,
    tableName: "ticket",
  }
);

export { sequelize, user, userAuthentication, ticket };
