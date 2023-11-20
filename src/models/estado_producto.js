import Sequelize from "sequelize";
import { getConnection } from "../database/database.js";

const sequelize = getConnection();

const EstadoProducto = sequelize.define(
  "estado_producto",
  {
    est_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    est_nombre: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    alias: "EstadoProducto",
  }
);

export default EstadoProducto;
