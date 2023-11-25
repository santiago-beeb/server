import Usuario from "../models/usuario.js";
import TipoDocumento from "../models/tipo_documento.js";
import { sendActivationEmail } from "../helper/email.helper.js";
import { encrypt, compare } from "../helper/handleBcrypt.js";
import { generateToken } from "../helper/jwt.js";
import CryptoJS from "crypto-js";
import config from "../config.js";

const addUser = async (req, res) => {
  try {
    const {
      usr_tipo_documento,
      usr_numero_documento,
      usr_nombre,
      usr_apellido,
      usr_email,
      usr_contrasenia,
    } = req.body;

    const passwordHash = await encrypt(usr_contrasenia);

    // Crear un nuevo usuario en la base de datos
    const newUser = await Usuario.create({
      usr_rol: 2,
      usr_tipo_documento,
      usr_numero_documento,
      usr_nombre,
      usr_apellido,
      usr_email,
      usr_contrasenia: passwordHash,
      usr_estado: 2,
    });

    // Generar el enlace de activación
    const activationLink =
      "https://general-shop.vercel.app/activate/" + newUser.usr_id;

    // Enviar el correo de activación
    await sendActivationEmail(usr_email, activationLink);

    res.status(201).json({ message: "Usuario agregado exitosamente", newUser });
  } catch (error) {
    if (error && error.name === "SequelizeUniqueConstraintError") {
      if (error.fields.usr_email) {
        res.status(400).json({ message: "El correo ya está en uso" });
      } else if (error.fields.usr_document_number) {
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

const activateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Buscar al usuario por su ID
    const user = await Usuario.findByPk(userId);

    // Verificar que el usuario existe y su estado es 2 (inactivo)
    if (user && user.usr_estado === 2) {
      // Actualizar el estado del usuario a 1 (activo)
      await user.update({ usr_estado: 1 });
      res.status(200).json({ message: "Cuenta activada con éxito" });
    } else {
      res.status(400).json({
        message: "Enlace de activación inválido o la cuenta ya está activa",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
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

    // Buscar al usuario por su correo electrónico
    const user = await Usuario.findOne({ where: { usr_email } });

    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Verificar si el usuario está activo (usr_status = 1)
    if (user.usr_estado !== 1) {
      return res.status(401).json({ message: "Usuario no activo" });
    }

    let isAdmin = false;
    if (user.usr_rol === 1) {
      isAdmin = true;
    }

    //Desifrar
    const bytes = CryptoJS.AES.decrypt(usr_contrasenia, config.key);
    const contraseniaDescifrada = bytes.toString(CryptoJS.enc.Utf8);

    // Verificar la contraseña
    const passwordValid = await compare(
      contraseniaDescifrada,
      user.usr_contrasenia
    );

    if (passwordValid) {
      // Generar el token de autenticación
      const token = generateToken(user);
      return res.status(200).json({
        message: "Inicio de sesión exitoso",
        nombre: user.usr_nombre,
        email: user.usr_email,
        isAdmin,
        token,
      });
    } else {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDocumentTypes = async (req, res) => {
  try {
    const documentTypes = await TipoDocumento.findAll();

    res.status(200).json(documentTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const methods = {
  addUser,
  login,
  getDocumentTypes,
  activateUser,
};
