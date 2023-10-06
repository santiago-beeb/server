import config from "../config.js";
import { getConnection } from "../database/database.js";
import { encrypt, compare } from "../helper/handleBcrypt.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../helper/jwt.js";

const addUser = async (req, res) => {
  try {
    const connection = await getConnection();
    const {
      usr_tipo_documento,
      usr_numero_documento,
      usr_nombre,
      usr_apellido,
      usr_email,
      usr_contrasenia,
    } = req.body;

    const contraseniaHash = await encrypt(usr_contrasenia);

    const usuario = {
      usr_rol: 2,
      usr_tipo_documento,
      usr_numero_documento,
      usr_nombre,
      usr_apellido,
      usr_email,
      usr_contrasenia: contraseniaHash,
    };

    const result = await connection.query("INSERT INTO usuario SET ?", usuario);

    res.status(201).json({ message: "Usuario agregado exitosamente", result });
  } catch (error) {
    if (error && error.code === "ER_DUP_ENTRY") {
      if (error.sqlMessage.includes("usr_email")) {
        res.status(400).json({ message: "El correo ya está en uso" });
      } else if (error.sqlMessage.includes("usr_numero_documento")) {
        res
          .status(400)
          .json({ message: "El número de documento ya está en uso" });
      } else {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const login = async (req, res) => {
  try {
    const { usr_email, usr_contrasenia } = req.body;

    if (!usr_email || !usr_contrasenia) {
      return res
        .status(400)
        .json({ message: "El correo y la contraseña son requeridos" });
    }

    const connection = await getConnection();
    const userQuery = await connection.query(
      "SELECT * FROM usuario WHERE usr_email = ?",
      [usr_email]
    );

    if (userQuery.length === 0 || userQuery[0].length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const user = userQuery[0][0];

    if (!user.usr_contrasenia) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const contraseniaValida = await compare(
      usr_contrasenia,
      user.usr_contrasenia
    );

    if (contraseniaValida) {
      const token = generateToken(user);
      return res.status(200).json({
        message: "Inicio de sesión exitoso",
        nombre: user.usr_nombre,
        token,
      });
    } else {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDocumentTypes = async (_req, res) => {
  try {
    const connection = await getConnection();
    const documentTypesQuery = await connection.query(
      "SELECT tpd_id, tpd_descripcion FROM tipo_documento"
    );

    const documentTypes = documentTypesQuery[0];
    res.status(200).json(documentTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const methods = {
  addUser,
  login,
  getDocumentTypes,
};
