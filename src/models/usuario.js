import Sequelize from "sequelize";
import { getConnection } from "../database/database.js";

const sequelize = getConnection();

const Usuario = sequelize.define(
  "usuario",
  {
    usr_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    usr_rol: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    usr_tipo_documento: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    usr_numero_documento: {
      type: Sequelize.STRING(15),
      allowNull: false,
      unique: true,
    },
    usr_nombre: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    usr_apellido: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    usr_email: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    },
    usr_contrasenia: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    usr_estado: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Usuario;
