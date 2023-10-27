import { sendOrderEmail } from "../helper/email.helper.js";
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
      "SELECT pdc.pdc_id, pdc.pdc_descripcion, sec.sec_nombre AS pdc_fk_seccion, mar.mar_nombre AS pdc_fk_marca, col.col_nombre AS pdc_fk_color, pdc.cant_xs, pdc.cant_s, pdc.cant_m, pdc.cant_l, pdc.cant_xl, pdc.pdc_valor, pdc.pdc_imagen, est.est_nombre AS pdc_fk_estado FROM producto pdc INNER JOIN seccion_producto sec ON pdc.pdc_fk_seccion = sec.sec_id INNER JOIN marca_producto mar ON pdc.pdc_fk_marca = mar.mar_id INNER JOIN color_producto col ON pdc.pdc_fk_color = col.col_id INNER JOIN estado_producto est ON pdc.pdc_estado = est.est_id WHERE sec.sec_id = 1 AND est.est_id = 1"
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
      "SELECT pdc.pdc_id, pdc.pdc_descripcion, sec.sec_nombre AS pdc_fk_seccion, mar.mar_nombre AS pdc_fk_marca, col.col_nombre AS pdc_fk_color, pdc.cant_xs, pdc.cant_s, pdc.cant_m, pdc.cant_l, pdc.cant_xl, pdc.pdc_valor, pdc.pdc_imagen, est.est_nombre AS pdc_fk_estado FROM producto pdc INNER JOIN seccion_producto sec ON pdc.pdc_fk_seccion = sec.sec_id INNER JOIN marca_producto mar ON pdc.pdc_fk_marca = mar.mar_id INNER JOIN color_producto col ON pdc.pdc_fk_color = col.col_id INNER JOIN estado_producto est ON pdc.pdc_estado = est.est_id WHERE sec.sec_id = 2 AND est.est_id = 1"
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

const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const connection = await getConnection();
    const [product] = await connection.query(
      "SELECT pdc.pdc_id, pdc.pdc_descripcion, sec.sec_nombre AS pdc_fk_seccion, mar.mar_nombre AS pdc_fk_marca, col.col_nombre AS pdc_fk_color, pdc.cant_xs, pdc.cant_s, pdc.cant_m, pdc.cant_l, pdc.cant_xl, pdc.pdc_valor, pdc.pdc_imagen, est.est_nombre AS pdc_fk_estado FROM producto pdc INNER JOIN seccion_producto sec ON pdc.pdc_fk_seccion = sec.sec_id INNER JOIN marca_producto mar ON pdc.pdc_fk_marca = mar.mar_id INNER JOIN color_producto col ON pdc.pdc_fk_color = col.col_id INNER JOIN estado_producto est ON pdc.pdc_estado = est.est_id WHERE pdc.pdc_id = ?",
      [productId]
    );

    if (product.length > 0) {
      res.status(200).json(product[0]);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editProduct = async (req, res) => {
  try {
    const { productId } = req.params;
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
      "UPDATE producto SET pdc_descripcion = ?, pdc_fk_seccion = ?, pdc_fk_marca = ?, pdc_fk_color = ?, cant_xs = ?, cant_s = ?, cant_m = ?, cant_l = ?, cant_xl = ?, pdc_valor = ?, pdc_imagen = ?, pdc_estado = ? WHERE pdc_id = ?",
      [
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
        productId,
      ]
    );

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Producto editado con éxito" });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addOrden = async (req, res) => {
  try {
    const connection = await getConnection();
    const {
      ord_fecha_compra,
      ord_valor_total,
      ord_fk_usuario,
      ord_direccion,
      productos,
      userEmail,
    } = req.body;

    const orden = {
      ord_fk_estado: 1,
      ord_fecha_compra,
      ord_valor_total,
      ord_fk_usuario,
      ord_direccion,
    };

    // Inserta la orden en la tabla 'orden'
    const [result] = await connection.query("INSERT INTO orden SET ?", orden);

    // Itera a través de la lista de productos y crea registros de detalle de orden para cada producto
    for (const product of productos) {
      const detailOrden = {
        det_fk_orden: result.insertId, // Utilizamos el ID de la orden principal
        det_fk_producto: product.pdc_id,
        det_talla: product.size,
        det_cantidad: product.quantity,
      };
      // Inserta el detalle de orden en la tabla 'detalle_orden'
      await connection.query("INSERT INTO detalle_orden SET ?", detailOrden);
    }
    sendOrderEmail(userEmail, detailOrden);
    return res.json({
      message: "Orden agregada con éxito",
      orderId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al agregar la orden" });
  }
};

const updateSize = async (req, res) => {
  try {
    const connection = await getConnection();
    const sizeUpdates = req.body.sizeUpdates;

    for (const update of sizeUpdates) {
      const productId = update.productId;
      const size = update.size;
      const quantity = update.quantity;

      const [rows] = await connection.query(
        `SELECT ${size} FROM producto WHERE pdc_id=?`,
        [productId]
      );
      const sizes = rows[0][size];

      if (quantity > sizes || sizes === 0) {
        return res.json({ message: "Cantidad sin stock" });
      }

      const result = await connection.query(
        `UPDATE producto SET ${size} = ${size} - ? WHERE pdc_id = ?`,
        [quantity, productId]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
    }

    return res.status(200).json({ message: "Tallas actualizadas" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

const mostSearcher = async (req, res) => {
  try {
    const connection = await getConnection();

    const [mostSearchedProducts] = await connection.query(
      "SELECT pdc.pdc_id, pdc.pdc_descripcion, sec.sec_nombre AS pdc_fk_seccion, mar.mar_nombre AS pdc_fk_marca, col.col_nombre AS pdc_fk_color, pdc.cant_xs, pdc.cant_s, pdc.cant_m, pdc.cant_l,  pdc.cant_xl,  pdc.pdc_valor,  pdc.pdc_imagen,  est.est_nombre AS pdc_fk_estado, b.contador FROM busquedas b INNER JOIN producto pdc ON b.pdc_id = pdc.pdc_id INNER JOIN seccion_producto sec ON pdc.pdc_fk_seccion = sec.sec_id INNER JOIN marca_producto mar ON pdc.pdc_fk_marca = mar.mar_id INNER JOIN color_producto col ON pdc.pdc_fk_color = col.col_id INNER JOIN estado_producto est ON pdc.pdc_estado = est.est_id WHERE est.est_id = 1 ORDER BY b.contador DESC LIMIT 3"
    );

    res.json(mostSearchedProducts);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "Error al obtener los productos más buscados" });
  }
};

const incrementSearcher = async (req, res) => {
  try {
    const productId = req.params.id; // Asegúrate de que 'id' es el nombre correcto del parámetro en tu ruta
    const connection = await getConnection();

    // Primero, verifica si ya existe una entrada en la tabla 'busquedas' para el producto actual.
    const [existingSearch] = await connection.query(
      "SELECT contador FROM busquedas WHERE pdc_id = ?",
      [productId]
    );

    if (existingSearch.length > 0) {
      // Si existe una entrada, aumenta el contador en 1.
      const newCount = existingSearch[0].contador + 1;
      await connection.query(
        "UPDATE busquedas SET contador = ? WHERE pdc_id = ?",
        [newCount, productId]
      );
    } else {
      // Si no existe una entrada, crea una nueva con contador 1.
      await connection.query(
        "INSERT INTO busquedas (pdc_id, contador) VALUES (?, 1)",
        [productId]
      );
    }

    res
      .status(200)
      .json({ message: "Contador de búsquedas actualizado correctamente" });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "Error al actualizar el contador de búsquedas" });
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
  getProduct,
  getProductsForMen,
  getProductsForWomen,
  getSeccion,
  getEstado,
  getMarca,
  getColor,
  addProduct,
  deleteProduct,
  editProduct,
  mostSearcher,
  incrementSearcher,
  updateSize,
  addOrden,
};
