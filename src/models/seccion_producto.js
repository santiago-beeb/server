import Sequelize from "sequelize";
import { getConnection } from "../database/database.js";

const sequelize = getConnection();

const SeccionProducto = sequelize.define(
  "seccion_producto",
  {
    sec_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    sec_nombre: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    alias: "SeccionProducto",
  }
);

export default SeccionProducto;
