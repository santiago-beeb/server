import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "salzategarcia@gmail.com",
    pass: "klfk foel qrcq xsqd",
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

// Función para enviar un correo de confirmación de pedido
const sendOrderEmail = async (userEmail, detailOrder) => {
  try {
    const mailOptions = {
      from: "salzategarcia@gmail.com", // Debe ser la misma dirección de correo que se utiliza en el transporte
      to: userEmail,
      subject: "Confirmación de Pedido",
      text: `Gracias por tu pedido. A continuación se detallan los productos:\n\n${detailOrder}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Correo de confirmación enviado: ${info.response}`);
  } catch (error) {
    console.error("Error al enviar el correo de confirmación: ", error);
  }
};

export { sendActivationEmail, sendOrderEmail };
