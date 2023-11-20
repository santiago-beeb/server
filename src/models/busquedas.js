import Sequelize from "sequelize";
import { getConnection } from "../database/database.js";

const sequelize = getConnection();

const Busquedas = sequelize.define(
  "busquedas",
  {
    busqueda_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    pdc_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    contador: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    alias: "Busquedas",
  }
);

export default Busquedas;
