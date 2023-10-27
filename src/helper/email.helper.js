import nodemailer from "nodemailer";
import config from "../config.js";

// Configuración del transporte de Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail", // Servicio de correo (puedes usar otros servicios o configuraciones según tus preferencias)
  auth: {
    user: "salzategarcia@gmail.com", 
    pass: "klfk foel qrcq xsqd", // Tu contraseña de correo
  },
});

// Función para enviar un correo de activación
const sendActivationEmail = async (userEmail, activationLink) => {
  try {
    // Configura el mensaje de correo
    const mailOptions = {
      from: "salzategarcia@gmail.com",
      to: userEmail,
      subject: "Activación de cuenta",
      text: `Haz clic en el siguiente enlace para activar tu cuenta: ${activationLink}`,
    };

    // Envía el correo
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error al enviar el correo de activación:", error);
  }
};

export { sendActivationEmail };
