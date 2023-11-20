import Sequelize from "sequelize";
import config from "../config.js";

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  port: config.port,
  dialect: "mysql",
});

export const getConnection = () => sequelize;
