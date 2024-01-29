import Usuario from "../models/usuario.js";
import TipoDocumento from "../models/tipo_documento.js";
import { sendActivationEmail } from "../helper/email.helper.js";
import { encrypt, compare } from "../helper/handleBcrypt.js";
import { generateToken } from "../helper/jwt.js";
import CryptoJS from "crypto-js";
import config from "../config.js";

export const addUser = async ({
  usr_tipo_documento,
  usr_numero_documento,
  usr_nombre,
  usr_apellido,
  usr_email,
  usr_contrasenia,
}) => {
  try {
    // Descifrar contraseña
    const bytes = CryptoJS.AES.decrypt(usr_contrasenia, config.key);
    const contraseniaDescifrada = bytes.toString(CryptoJS.enc.Utf8);

    // Validar longitud y complejidad de la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/;
    if (!passwordRegex.test(contraseniaDescifrada)) {
      throw {
        status: 400,
        message:
          "La contraseña debe tener minimo 5 caracteres, incluyendo al menos una mayúscula, una minúscula y un número.",
      };
    }

    const passwordHash = await encrypt(contraseniaDescifrada);

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

    return { message: "Usuario agregado exitosamente" };
  } catch (error) {
    if (error && error.name === "SequelizeUniqueConstraintError") {
      if (error.fields.usr_email) {
        throw { status: 400, message: "El correo ya está en uso" };
      } else if (error.fields.usr_document_number) {
        throw { status: 400, message: "El número de documento ya está en uso" };
      } else {
        throw { status: 500, error: error.message };
      }
    } else {
      throw { status: 500, error: error.message };
    }
  }
};

export const activateUser = async (userId) => {
  try {
    // Buscar al usuario por su ID
    const user = await Usuario.findByPk(userId);

    // Verificar que el usuario existe y su estado es 2 (inactivo)
    if (user && user.usr_estado === 2) {
      // Actualizar el estado del usuario a 1 (activo)
      await user.update({ usr_estado: 1 });
      return { message: "Cuenta activada con éxito" };
    } else {
      throw {
        status: 400,
        message: "Enlace de activación inválido o la cuenta ya está activa",
      };
    }
  } catch (error) {
    throw { status: 500, message: "Error en el servidor" };
  }
};

export const login = async ({ usr_email, usr_contrasenia }) => {
  try {
    if (!usr_email || !usr_contrasenia) {
      throw {
        status: 400,
        message: "El correo y la contraseña son requeridos",
      };
    }

    // Buscar al usuario por su correo electrónico
    const user = await Usuario.findOne({ where: { usr_email } });

    if (!user) {
      throw { status: 401, message: "Credenciales incorrectas" };
    }

    // Verificar si el usuario está activo (usr_status = 1)
    if (user.usr_estado !== 1) {
      throw { status: 401, message: "Usuario no activo" };
    }

    let isAdmin = false;
    if (user.usr_rol === 1) {
      isAdmin = true;
    }

    // Descifrar contraseña
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
      return {
        message: "Inicio de sesión exitoso",
        nombre: user.usr_nombre,
        email: user.usr_email,
        isAdmin,
        token,
      };
    } else {
      throw { status: 401, message: "Credenciales incorrectas" };
    }
  } catch (error) {
    throw { status: 500, error: error.message };
  }
};

export const getDocumentTypes = async () => {
  try {
    const documentTypes = await TipoDocumento.findAll();
    return documentTypes;
  } catch (error) {
    throw { status: 500, error: error.message };
  }
};
