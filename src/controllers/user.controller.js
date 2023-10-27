import { getConnection } from "../database/database.js";
import { sendActivationEmail } from "../helper/email.helper.js";
import { encrypt, compare } from "../helper/handleBcrypt.js";
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
      usr_estado: 2,
    };

    const [result] = await connection.query(
      "INSERT INTO usuario SET ?",
      usuario
    );

    // Obtén el ID del usuario insertado
    const usuarioId = result.insertId;
    console.log(result.insertId);
    // Luego de insertar al usuario, genera un enlace de activación
    const activationLink =
      "https://general-shop.vercel.app/activate/" + usuarioId;

    // Envía el correo de activación
    await sendActivationEmail(usr_email, activationLink);

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

const activeUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const connection = await getConnection();

    // Busca al usuario por su ID
    const [user] = await connection.query(
      "SELECT * FROM usuario WHERE usr_id = ?",
      [userId]
    );

    // Verifica que el usuario existe y su estado es 2 (inactivo)
    if (user.length > 0 && user[0].usr_estado === 2) {
      // Actualiza el estado del usuario a 1 (activo)
      await connection.query(
        "UPDATE usuario SET usr_estado = 1 WHERE usr_id = ?",
        [userId]
      );
      res.send("Tu cuenta ha sido activada. Ahora puedes iniciar sesión.");
    } else {
      res.send("Enlace de activación inválido o la cuenta ya está activa.");
    }
  } catch (error) {
    // Manejo de errores
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

    // Verifica si el usuario está activo (usr_estado = 1)
    if (user.usr_estado !== 1) {
      return res.status(401).json({ message: "Usuario no activo" });
    }

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
  activeUser,
};
