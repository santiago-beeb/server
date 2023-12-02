import Sequelize from "sequelize";
import mysql2 from "mysql2";
import config from "../config.js";

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectModule: mysql2,
  }
);

export const getConnection = () => sequelize;
