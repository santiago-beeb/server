import Sequelize from 'sequelize';
import { getConnection } from '../database/database.js';

const sequelize = getConnection();

const ColorProducto = sequelize.define(
  'color_producto',
  {
    col_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    col_nombre: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    alias: "ColorProducto",
  }
);

export default ColorProducto;
