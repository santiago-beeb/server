import Sequelize from "sequelize";
import { getConnection } from "../database/database.js";

const sequelize = getConnection();

const Prueba = sequelize.define(
  "prueba_base64",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    base64: {
      type: Sequelize.BLOB("long"),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Prueba;
