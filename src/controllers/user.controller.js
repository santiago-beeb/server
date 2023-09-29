import { getConnection } from "../database/database.js";
import { encrypt, compare } from "../helper/handleBcrypt.js";

const getUser = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM usuario");
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

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

    // Encriptar la contraseña de forma asincrónica
    const contraseniaHash = await encrypt(usr_contrasenia);

    // Crear un objeto de usuario
    const usuario = {
      usr_rol: 2,
      usr_tipo_documento,
      usr_numero_documento,
      usr_nombre,
      usr_apellido,
      usr_email,
      usr_contrasenia: contraseniaHash,
    };

    // Realizar la inserción en la tabla de usuarios
    const result = await connection.query("INSERT INTO usuario SET ?", usuario);

    // Devolver una respuesta exitosa
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
        // Otros errores
        res.status(500).json({ error: error.message });
      }
    } else {
      // Otros errores
      res.status(500).json({ error: error.message });
    }
  }
};

const login = async (req, res) => {
  try {
    const { email, contrasenia } = req.body;

    if (!email || !contrasenia) {
      return res
        .status(400)
        .json({ message: "El correo y la contraseña son requeridos" });
    }

    const connection = await getConnection();
    const userQuery = await connection.query(
      "SELECT * FROM usuario WHERE usr_email = ?",
      [email]
    );

    if (userQuery.length === 0 || userQuery[0].length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const user = userQuery[0][0];

    if (!user.usr_contrasenia) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const contraseniaValida = await compare(contrasenia, user.usr_contrasenia);

    if (contraseniaValida) {
      return res.status(200).json({ message: "Inicio de sesión exitoso" });
    } else {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const methods = {
  addUser,
  getUser,
  login,
};
