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
      html: `
        <body>
          <table width="100%" height="100%" style="margin: 0; padding: 0; border-collapse: collapse;">
            <tr>
              <td align="center" valign="middle">
                <div style="width: 300px; text-align: center;">
                  <h1 style="color: blue;">Bienvenido</h1>
                  <p style="font-size: 16px;">Haz clic en el siguiente botón para activar tu cuenta:</p>
                  <a href="${activationLink}" style="display: inline-block; background-color: green; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Haz click aquí</a>
                </div>
              </td>
            </tr>
          </table>
        </body>
      `,
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
    // Configura el mensaje de correo
    const mailOptions = {
      from: "salzategarcia@gmail.com",
      to: userEmail,
      subject: "Confirmación de Pedido",
      html: `
        <body>
          <table width="100%" height="100%" style="margin: 0; padding: 0; border-collapse: collapse;">
            <tr>
              <td align="center" valign="middle">
                <div style="width: 300px; text-align: center;">
                  <h1>Gracias por tu pedido</h1>
                  <p>A continuación se detallan los productos:</p>
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Descripción</th>
                        <th>Talla</th>
                        <th>Cantidad</th>
                        <th>Color</th>
                        <th>Precio</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${detailOrder}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </table>
        </body>
      `,
    };

    // Envía el correo
    const info = await transporter.sendMail(mailOptions);
    console.log(`Correo de confirmación enviado: ${info.response}`);
    return true; // Devuelve true si el correo electrónico se envió con éxito
  } catch (error) {
    console.error("Error al enviar el correo de confirmación:", error);
    return false; // Devuelve false si hubo un error al enviar el correo electrónico
  }
};

export { sendActivationEmail, sendOrderEmail };
