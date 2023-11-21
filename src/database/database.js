import Sequelize from "sequelize";
import mysql2 from "mysql2";
import config from "../config.js";

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  port: config.port,
  dialect: "mysql",
  dialectModule: mysql2,
});

export const getConnection = () => sequelize;
