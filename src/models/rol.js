import Sequelize from "sequelize";
import { getConnection } from "../database/database.js";

const sequelize = getConnection();

const Rol = sequelize.define(
  "rol",
  {
    rol_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    rol_nombre: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Rol;
