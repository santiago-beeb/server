import Sequelize from "sequelize";
import { getConnection } from "../database/database.js";

const sequelize = getConnection();

const Orden = sequelize.define(
  "orden",
  {
    ord_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    ord_fk_estado: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    ord_fecha_compra: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    ord_valor_total: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    ord_fk_usuario: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    ord_direccion: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Orden;
