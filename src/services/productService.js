import Producto from "../models/producto.js";
import SeccionProducto from "../models/seccion_producto.js";
import MarcaProducto from "../models/marca_producto.js";
import ColorProducto from "../models/color_producto.js";
import EstadoProducto from "../models/estado_producto.js";
import Busquedas from "../models/busquedas.js";
import Orden from "../models/orden.js";
import DetalleOrden from "../models/detalle_orden.js";
import { sendOrderEmail } from "../helper/email.helper.js";

export const getProducts = async () => {
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
    const formattedProducts = products.map((product) => ({
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
    }));

    return formattedProducts;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProductsForMen = async () => {
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
    const formattedProducts = productsForMen.map((product) => ({
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
    }));

    return formattedProducts;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProductsForWomen = async () => {
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
    const formattedProducts = productsForWomen.map((product) => ({
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
    }));

    return formattedProducts;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addProduct = async (productData) => {
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
    } = productData;

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

    return { message: "Producto agregado con éxito", newProduct };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteProduct = async (productId) => {
  try {
    const result = await Producto.destroy({ where: { pdc_id: productId } });

    if (result) {
      return { message: "Producto eliminado con éxito" };
    } else {
      throw new Error("Producto no encontrado");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProduct = async (productId) => {
  try {
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
      return mappedProduct;
    } else {
      throw new Error("Producto no encontrado");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const editProduct = async (productId, productData) => {
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
    } = productData;

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
      return { message: "Producto editado con éxito" };
    } else {
      throw new Error("Producto no encontrado");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateSize = async (sizeUpdates) => {
  try {
    for (const update of sizeUpdates) {
      const productId = update.productId;
      const size = update.size.toLowerCase();
      const quantity = update.quantity;

      const product = await Producto.findByPk(productId, {
        attributes: [size],
      });

      const sizes = product[size];

      if (quantity > sizes || sizes === 0) {
        throw new Error(
          `Cantidad sin stock para el producto con ID ${productId}`
        );
      }

      const updatedProduct = {};
      updatedProduct[size] = sizes - quantity;

      const result = await Producto.update(updatedProduct, {
        where: { pdc_id: productId },
      });

      if (result[0] === 0) {
        throw new Error("Producto no encontrado");
      }
    }

    return { message: "Tallas actualizadas" };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addOrden = async (orderData) => {
  try {
    const {
      ord_fecha_compra,
      ord_valor_total,
      ord_fk_usuario,
      ord_direccion,
      productos,
      userEmail,
    } = orderData;

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

    const productInformationList = productos.map((product) => ({
      description: product.pdc_descripcion,
      size: product.size,
      quantity: product.quantity,
      color: product.pdc_fk_color,
      price: product.pdc_valor,
    }));

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

    return { message: "Orden agregada con éxito", orderId: result.insertId };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const mostSearcher = async () => {
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

    const formattedMostSearchedProducts = mostSearchedProducts.map((search) => {
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

    return formattedMostSearchedProducts;
  } catch (error) {
    console.error(error.message);
    throw new Error("Error al obtener los productos más buscados");
  }
};

export const incrementSearcher = async (productId) => {
  try {
    const [search, created] = await Busquedas.findOrCreate({
      where: { pdc_id: productId },
      defaults: { pdc_id: productId, contador: 1 },
    });

    if (!created) {
      await search.increment("contador", { by: 1 });
    }

    return { message: "Contador de búsquedas actualizado correctamente" };
  } catch (error) {
    console.error(error.message);
    throw new Error("Error al actualizar el contador de búsquedas");
  }
};

export const getSeccion = async () => {
  try {
    const secciones = await SeccionProducto.findAll();
    return secciones;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getMarca = async () => {
  try {
    const marcas = await MarcaProducto.findAll();
    return marcas;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getColor = async () => {
  try {
    const colores = await ColorProducto.findAll();
    return colores;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getEstado = async () => {
  try {
    const estados = await EstadoProducto.findAll();
    return estados;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getOrdersByUser = async (userId) => {
  try {
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

    return formattedOrders;
  } catch (error) {
    throw new Error(error.message);
  }
};
