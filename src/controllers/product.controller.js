import { getConnection } from "../database/database.js";

const getProducts = async (req, res) => {
  try {
    // Obtiene una conexión a la base de datos
    const connection = await getConnection();

    // Consulta todos los productos en la base de datos
    const [products] = await connection.query("SELECT * FROM producto");

    // Envía la lista de productos en la respuesta
    res.status(200).json(products);
  } catch (error) {
    // En caso de error, envía una respuesta de error
    res.status(500).json({ error: error.message });
  }
};

export const methods = {
    getProducts
};
