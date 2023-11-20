import Sequelize from "sequelize";
import { getConnection } from "../database/database.js";

const sequelize = getConnection();

const Prueba = sequelize.define(
  "prueba",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: Sequelize.STRING,
    },
    descripcion: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Prueba;
