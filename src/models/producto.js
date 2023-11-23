import Sequelize from "sequelize";
import { getConnection } from "../database/database.js";

const sequelize = getConnection();

const Producto = sequelize.define(
  "producto",
  {
    pdc_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    pdc_fk_seccion: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    pdc_descripcion: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    pdc_fk_marca: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    pdc_fk_color: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    cant_xs: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    cant_s: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    cant_m: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    cant_l: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    cant_xl: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    pdc_valor: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    pdc_imagen: {
      type: Sequelize.BLOB("long"),
      allowNull: false,
    },
    pdc_estado: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Producto;
