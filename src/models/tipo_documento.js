import Sequelize from "sequelize";
import { getConnection } from "../database/database.js";

const sequelize = getConnection();

const TipoDocumento = sequelize.define(
  "tipo_documento",
  {
    tpd_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    tpd_descripcion: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default TipoDocumento;
