import Sequelize from "sequelize";
import { getConnection } from "../database/database.js";

const sequelize = getConnection();

const DetalleOrden = sequelize.define(
  "detalle_orden",
  {
    det_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    det_fk_orden: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    det_fk_producto: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    det_talla: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    det_cantidad: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default DetalleOrden;
