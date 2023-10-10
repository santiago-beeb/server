import { getConnection } from "../database/database.js";

const getProducts = async (req, res) => {
  try {
    const connection = await getConnection();
    const [products] = await connection.query(
      "SELECT pdc.pdc_id, pdc.pdc_descripcion, sec.sec_nombre AS pdc_fk_seccion, mar.mar_nombre AS pdc_fk_marca, col.col_nombre AS pdc_fk_color, pdc.cant_xs, pdc.cant_s, pdc.cant_m, pdc.cant_l, pdc.cant_xl, pdc.pdc_valor, pdc.pdc_imagen, est.est_nombre AS pdc_fk_estado FROM producto pdc INNER JOIN seccion_producto sec ON pdc.pdc_fk_seccion = sec.sec_id INNER JOIN marca_producto mar ON pdc.pdc_fk_marca = mar.mar_id INNER JOIN color_producto col ON pdc.pdc_fk_color = col.col_id INNER JOIN estado_producto est ON pdc.pdc_estado = est.est_id"
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
      "SELECT pdc.pdc_id, pdc.pdc_descripcion, sec.sec_nombre AS pdc_fk_seccion, mar.mar_nombre AS pdc_fk_marca, col.col_nombre AS pdc_fk_color, pdc.cant_xs, pdc.cant_s, pdc.cant_m, pdc.cant_l, pdc.cant_xl, pdc.pdc_valor, pdc.pdc_imagen, est.est_nombre AS pdc_fk_estado FROM producto pdc INNER JOIN seccion_producto sec ON pdc.pdc_fk_seccion = sec.sec_id INNER JOIN marca_producto mar ON pdc.pdc_fk_marca = mar.mar_id INNER JOIN color_producto col ON pdc.pdc_fk_color = col.col_id INNER JOIN estado_producto est ON pdc.pdc_estado = est.est_id WHERE sec.sec_id = 1"
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
      "SELECT pdc.pdc_id, pdc.pdc_descripcion, sec.sec_nombre AS pdc_fk_seccion, mar.mar_nombre AS pdc_fk_marca, col.col_nombre AS pdc_fk_color, pdc.cant_xs, pdc.cant_s, pdc.cant_m, pdc.cant_l, pdc.cant_xl, pdc.pdc_valor, pdc.pdc_imagen, est.est_nombre AS pdc_fk_estado FROM producto pdc INNER JOIN seccion_producto sec ON pdc.pdc_fk_seccion = sec.sec_id INNER JOIN marca_producto mar ON pdc.pdc_fk_marca = mar.mar_id INNER JOIN color_producto col ON pdc.pdc_fk_color = col.col_id INNER JOIN estado_producto est ON pdc.pdc_estado = est.est_id WHERE sec.sec_id = 2"
    );
    res.status(200).json(productsForWomen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      pdc_descripcion,
      pdc_fk_seccion,
      pdc_fk_marca,
      pdc_fk_color,
      cant_xs,
      cant_s,
      cant_m,
      cant_l,
      cant_xl,
      pdc_valor,
      pdc_imagen,
      pdc_estado,
    } = req.body;

    const connection = await getConnection();
    const [result] = await connection.query(
      "INSERT INTO producto (pdc_fk_seccion, pdc_descripcion, pdc_fk_marca, pdc_fk_color, cant_xs, cant_s, cant_m, cant_l, cant_xl, pdc_valor, pdc_imagen, pdc_estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        pdc_fk_seccion,
        pdc_descripcion,
        pdc_fk_marca,
        pdc_fk_color,
        cant_xs,
        cant_s,
        cant_m,
        cant_l,
        cant_xl,
        pdc_valor,
        pdc_imagen,
        pdc_estado,
      ]
    );

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Producto agregado con éxito" });
    } else {
      res.status(500).json({ error: "No se pudo agregar el producto" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params; // Obtén el ID del producto de los parámetros de la URL
    const connection = await getConnection();

    // Realiza la consulta SQL para eliminar el producto con el ID proporcionado
    const [result] = await connection.query(
      "DELETE FROM producto WHERE pdc_id = ?",
      [productId]
    );

    if (result.affectedRows > 0) {
      // Si al menos una fila se vio afectada, significa que se eliminó un producto
      res.status(200).json({ message: "Producto eliminado con éxito" });
    } else {
      // Si no se vio afectada ninguna fila, el producto no se encontró en la base de datos
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSeccion = async (req, res) => {
  try {
    const connection = await getConnection();
    const [secciones] = await connection.query(
      "SELECT sec_id, sec_nombre FROM seccion_producto"
    );
    res.status(200).json(secciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMarca = async (req, res) => {
  try {
    const connection = await getConnection();
    const [marcas] = await connection.query(
      "SELECT mar_id, mar_nombre FROM marca_producto"
    );
    res.status(200).json(marcas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getColor = async (req, res) => {
  try {
    const connection = await getConnection();
    const [colores] = await connection.query(
      "SELECT col_id, col_nombre FROM color_producto"
    );
    res.status(200).json(colores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEstado = async (req, res) => {
  try {
    const connection = await getConnection();
    const [estados] = await connection.query(
      "SELECT est_id, est_nombre FROM estado_producto"
    );
    res.status(200).json(estados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const methods = {
  getProducts,
  getProductsForMen,
  getProductsForWomen,
  addProduct,
  deleteProduct,
  getSeccion,
  getMarca,
  getColor,
  getEstado,
};
