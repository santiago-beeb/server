import { getConnection } from "../database/database.js";

const getProducts = async (req, res) => {
  try {
    const connection = await getConnection();
    const [products] = await connection.query(
      "SELECT * FROM producto WHERE pdc_estado = 1"
    );
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductsForMen = async (req, res) => {
  try {
    const connection = await getConnection();
    const [productsForMen] = await connection.query(
      "SELECT * FROM producto WHERE pdc_fk_seccion = 1 AND pdc_estado = 1"
    );
    res.status(200).json(productsForMen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductsForWomen = async (req, res) => {
  try {
    const connection = await getConnection();
    const [productsForWomen] = await connection.query(
      "SELECT * FROM producto WHERE pdc_fk_seccion = 2 AND pdc_estado = 1"
    );
    res.status(200).json(productsForWomen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const methods = {
  getProducts,
  getProductsForMen,
  getProductsForWomen,
};
