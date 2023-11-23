import Producto from "../models/producto.js";
import SeccionProducto from "../models/seccion_producto.js";
import MarcaProducto from "../models/marca_producto.js";
import ColorProducto from "../models/color_producto.js";
import EstadoProducto from "../models/estado_producto.js";
import Busquedas from "../models/busquedas.js";
import Orden from "../models/orden.js";
import DetalleOrden from "../models/detalle_orden.js";
import { sendOrderEmail } from "../helper/email.helper.js";

const getProducts = async (req, res) => {
  try {
    const products = await Producto.findAll({
      include: [
        {
          model: SeccionProducto,
          as: "SeccionProducto",
          attributes: ["sec_nombre"],
        },
        {
          model: MarcaProducto,
          as: "MarcaProducto",
          attributes: ["mar_nombre"],
        },
        {
          model: ColorProducto,
          as: "ColorProducto",
          attributes: ["col_nombre"],
        },
        {
          model: EstadoProducto,
          as: "EstadoProducto",
          attributes: ["est_nombre"],
        },
      ],
      attributes: [
        "pdc_id",
        "pdc_descripcion",
        "pdc_fk_seccion",
        "pdc_fk_marca",
        "pdc_fk_color",
        "cant_xs",
        "cant_s",
        "cant_m",
        "cant_l",
        "cant_xl",
        "pdc_valor",
        "pdc_imagen",
        "pdc_estado",
      ],
    });

    // Mapea el resultado para el formato deseado
    const formattedProducts = products.map((product) => {
      return {
        pdc_id: product.pdc_id,
        pdc_descripcion: product.pdc_descripcion,
        pdc_fk_seccion: product.SeccionProducto.sec_nombre,
        pdc_fk_marca: product.MarcaProducto.mar_nombre,
        pdc_fk_color: product.ColorProducto.col_nombre,
        cant_xs: product.cant_xs,
        cant_s: product.cant_s,
        cant_m: product.cant_m,
        cant_l: product.cant_l,
        cant_xl: product.cant_xl,
        pdc_valor: product.pdc_valor,
        pdc_imagen: product.pdc_imagen.toString("base64"),
        pdc_fk_estado: product.EstadoProducto.est_nombre,
      };
    });

    res.status(200).json(formattedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductsForMen = async (req, res) => {
  try {
    const productsForMen = await Producto.findAll({
      where: {
        pdc_fk_seccion: 1,
        pdc_estado: 1,
      },
      include: [
        {
          model: SeccionProducto,
          as: "SeccionProducto",
          attributes: ["sec_nombre"],
        },
        {
          model: MarcaProducto,
          as: "MarcaProducto",
          attributes: ["mar_nombre"],
        },
        {
          model: ColorProducto,
          as: "ColorProducto",
          attributes: ["col_nombre"],
        },
        {
          model: EstadoProducto,
          as: "EstadoProducto",
          attributes: ["est_nombre"],
        },
      ],
      attributes: [
        "pdc_id",
        "pdc_descripcion",
        "pdc_fk_seccion",
        "pdc_fk_marca",
        "pdc_fk_color",
        "cant_xs",
        "cant_s",
        "cant_m",
        "cant_l",
        "cant_xl",
        "pdc_valor",
        "pdc_imagen",
        "pdc_estado",
      ],
    });

    // Mapea el resultado para el formato deseado
    const formattedProducts = productsForMen.map((product) => {
      return {
        pdc_id: product.pdc_id,
        pdc_descripcion: product.pdc_descripcion,
        pdc_fk_seccion: product.SeccionProducto.sec_nombre,
        pdc_fk_marca: product.MarcaProducto.mar_nombre,
        pdc_fk_color: product.ColorProducto.col_nombre,
        cant_xs: product.cant_xs,
        cant_s: product.cant_s,
        cant_m: product.cant_m,
        cant_l: product.cant_l,
        cant_xl: product.cant_xl,
        pdc_valor: product.pdc_valor,
        pdc_imagen: product.pdc_imagen.toString("base64"),
        pdc_fk_estado: product.EstadoProducto.est_nombre,
      };
    });

    res.status(200).json(formattedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductsForWomen = async (req, res) => {
  try {
    const productsForWomen = await Producto.findAll({
      where: {
        pdc_fk_seccion: 2,
        pdc_estado: 1,
      },
      include: [
        {
          model: SeccionProducto,
          as: "SeccionProducto",
          attributes: ["sec_nombre"],
        },
        {
          model: MarcaProducto,
          as: "MarcaProducto",
          attributes: ["mar_nombre"],
        },
        {
          model: ColorProducto,
          as: "ColorProducto",
          attributes: ["col_nombre"],
        },
        {
          model: EstadoProducto,
          as: "EstadoProducto",
          attributes: ["est_nombre"],
        },
      ],
      attributes: [
        "pdc_id",
        "pdc_descripcion",
        "pdc_fk_seccion",
        "pdc_fk_marca",
        "pdc_fk_color",
        "cant_xs",
        "cant_s",
        "cant_m",
        "cant_l",
        "cant_xl",
        "pdc_valor",
        "pdc_imagen",
        "pdc_estado",
      ],
    });

    // Mapea el resultado para el formato deseado
    const formattedProducts = productsForWomen.map((product) => {
      return {
        pdc_id: product.pdc_id,
        pdc_descripcion: product.pdc_descripcion,
        pdc_fk_seccion: product.SeccionProducto.sec_nombre,
        pdc_fk_marca: product.MarcaProducto.mar_nombre,
        pdc_fk_color: product.ColorProducto.col_nombre,
        cant_xs: product.cant_xs,
        cant_s: product.cant_s,
        cant_m: product.cant_m,
        cant_l: product.cant_l,
        cant_xl: product.cant_xl,
        pdc_valor: product.pdc_valor,
        pdc_imagen: product.pdc_imagen.toString("base64"),
        pdc_fk_estado: product.EstadoProducto.est_nombre,
      };
    });

    res.status(200).json(formattedProducts);
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

    const imageBuffer = Buffer.from(pdc_imagen.split(",")[1], "base64");

    const newProduct = await Producto.create({
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
      pdc_imagen: imageBuffer,
      pdc_estado,
    });

    res
      .status(200)
      .json({ message: "Producto agregado con éxito", newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const result = await Producto.destroy({ where: { pdc_id: productId } });

    if (result) {
      res.status(200).json({ message: "Producto eliminado con éxito" });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Producto.findByPk(productId, {
      include: [
        { model: SeccionProducto, as: "SeccionProducto" },
        { model: MarcaProducto, as: "MarcaProducto" },
        { model: ColorProducto, as: "ColorProducto" },
        { model: EstadoProducto, as: "EstadoProducto" },
      ],
    });

    if (product) {
      const mappedProduct = {
        pdc_id: product.pdc_id,
        pdc_descripcion: product.pdc_descripcion,
        pdc_fk_seccion: product.SeccionProducto.sec_nombre,
        pdc_fk_marca: product.MarcaProducto.mar_nombre,
        pdc_fk_color: product.ColorProducto.col_nombre,
        cant_xs: product.cant_xs,
        cant_s: product.cant_s,
        cant_m: product.cant_m,
        cant_l: product.cant_l,
        cant_xl: product.cant_xl,
        pdc_valor: product.pdc_valor,
        pdc_imagen: product.pdc_imagen.toString("base64"),
        pdc_fk_estado: product.EstadoProducto.est_nombre,
      };
      res.status(200).json(mappedProduct);
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

    const imageBuffer = Buffer.from(pdc_imagen.split(",")[1], "base64");

    const [result] = await Producto.update(
      {
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
        pdc_imagen: imageBuffer,
        pdc_estado,
      },
      { where: { pdc_id: productId } }
    );

    if (result > 0) {
      res.status(200).json({ message: "Producto editado con éxito" });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSize = async (req, res) => {
  try {
    const sizeUpdates = req.body.sizeUpdates;

    for (const update of sizeUpdates) {
      const productId = update.productId;
      const size = update.size.toLowerCase();
      const quantity = update.quantity;

      const product = await Producto.findByPk(productId, {
        attributes: [size],
      });

      const sizes = product[size];

      if (quantity > sizes || sizes === 0) {
        return res.json({
          message: "Cantidad sin stock",
          productId: productId,
        });
      }

      const updatedProduct = {};
      updatedProduct[size] = sizes - quantity;

      const result = await Producto.update(updatedProduct, {
        where: { pdc_id: productId },
      });

      if (result[0] === 0) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
    }

    return res.status(200).json({ message: "Tallas actualizadas" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

const addOrden = async (req, res) => {
  try {
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
    const result = await Orden.create(orden);

    for (const product of productos) {
      const detailOrden = {
        det_fk_orden: result.dataValues.ord_id,
        det_fk_producto: product.pdc_id,
        det_talla: product.size,
        det_cantidad: product.quantity,
      };
      await DetalleOrden.create(detailOrden);
    }

    const productInformationList = [];

    for (const product of productos) {
      const informationOrder = {
        description: product.pdc_descripcion,
        size: product.size,
        quantity: product.quantity,
        color: product.pdc_fk_color,
        price: product.pdc_valor,
      };

      productInformationList.push(informationOrder);
    }

    const detailOrder = productInformationList
      .map(
        (productInfo, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${productInfo.description}</td>
          <td>${productInfo.size}</td>
          <td>${productInfo.quantity}</td>
          <td>${productInfo.color}</td>
          <td>$${productInfo.price}</td>
        </tr>`
      )
      .join("");

    // Enviar el correo electrónico con el detalle del pedido
    const emailSent = await sendOrderEmail(userEmail, detailOrder);
    if (!emailSent) {
      throw new Error("Error al enviar el correo de confirmación");
    }

    return res.json({
      message: "Orden agregada con éxito",
      orderId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al agregar la orden" });
  }
};

const mostSearcher = async (req, res) => {
  try {
    const mostSearchedProducts = await Busquedas.findAll({
      where: {},
      limit: 3,
      order: [["contador", "DESC"]],
      include: [
        {
          model: Producto,
          as: "producto",
          where: {
            pdc_estado: 1,
          },
          include: [
            {
              model: SeccionProducto,
              as: "SeccionProducto",
              attributes: ["sec_nombre"],
            },
            {
              model: MarcaProducto,
              as: "MarcaProducto",
              attributes: ["mar_nombre"],
            },
            {
              model: ColorProducto,
              as: "ColorProducto",
              attributes: ["col_nombre"],
            },
            {
              model: EstadoProducto,
              as: "EstadoProducto",
              attributes: ["est_nombre"],
            },
          ],
        },
      ],
    });

    // Mapea el resultado para el formato deseado
    const formattedMostSearchedProducts = mostSearchedProducts.map((search) => {
      // Comprueba si 'producto' está definido
      if (!search.producto) {
        console.log("La asociación 'producto' no está definida.");
        return {
          contador: search.contador,
          // Otras propiedades que desees manejar
        };
      }

      const product = search.producto;
      return {
        pdc_id: product.pdc_id,
        pdc_descripcion: product.pdc_descripcion,
        pdc_fk_seccion: product.SeccionProducto.sec_nombre,
        pdc_fk_marca: product.MarcaProducto.mar_nombre,
        pdc_fk_color: product.ColorProducto.col_nombre,
        cant_xs: product.cant_xs,
        cant_s: product.cant_s,
        cant_m: product.cant_m,
        cant_l: product.cant_l,
        cant_xl: product.cant_xl,
        pdc_valor: product.pdc_valor,
        pdc_imagen: product.pdc_imagen.toString("base64"),
        pdc_fk_estado: product.EstadoProducto.est_nombre,
        contador: search.contador,
      };
    });

    res.json(formattedMostSearchedProducts);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "Error al obtener los productos más buscados" });
  }
};

const incrementSearcher = async (req, res) => {
  try {
    const productId = req.params.id;
    const [search, created] = await Busquedas.findOrCreate({
      where: { pdc_id: productId },
      defaults: { pdc_id: productId, contador: 1 },
    });

    if (!created) {
      await search.increment("contador", { by: 1 });
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
    const secciones = await SeccionProducto.findAll();
    res.status(200).json(secciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMarca = async (req, res) => {
  try {
    const marcas = await MarcaProducto.findAll();
    res.status(200).json(marcas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getColor = async (req, res) => {
  try {
    const colores = await ColorProducto.findAll();
    res.status(200).json(colores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEstado = async (req, res) => {
  try {
    const estados = await EstadoProducto.findAll();
    res.status(200).json(estados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Orden.findAll({
      where: { ord_fk_usuario: userId },
      include: [
        {
          model: DetalleOrden,
          as: "detalle_ordens",
          required: false,
          include: [
            {
              model: Producto,
              as: "producto",
            },
          ],
        },
      ],
    });

    const formattedOrders = orders.map((order) => ({
      orderId: order.ord_id,
      orderState: order.ord_fk_estado,
      orderDate: order.ord_fecha_compra,
      totalValue: order.ord_valor_total,
      userId: order.ord_fk_usuario,
      address: order.ord_direccion,
      orderDetails: order.detalle_ordens.map((detail) => ({
        detailId: detail.det_id,
        productId: detail.det_fk_producto,
        productName: detail.producto.pdc_descripcion,
        productImage: detail.producto.pdc_imagen,
        size: detail.det_talla,
        quantity: detail.det_cantidad,
      })),
    }));

    if (orders) {
      res.status(200).json(formattedOrders);
    } else {
      res
        .status(404)
        .json({ error: "No se encontraron órdenes para este usuario" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const methods = {
  getProducts,
  getProduct,
  getProductsForMen,
  getProductsForWomen,
  getOrdersByUser,
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
