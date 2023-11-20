import Sequelize from 'sequelize';
import { getConnection } from '../database/database.js';

const sequelize = getConnection();

const MarcaProducto = sequelize.define(
  'marca_producto',
  {
    mar_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    mar_nombre: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    alias: "MarcaProducto",
  }
);

export default MarcaProducto;
