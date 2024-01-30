import * as productService from "../services/productService.js";

const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const getProductsForMen = async (req, res) => {
//   try {
//     const productsForMen = await productService.getProductsForMen();
//     res.status(200).json(productsForMen);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const getProductsForMen = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const selectedBrand = req.query.brand;
    const selectedColor = req.query.color;
    const productsForMen = await productService.getProductsForMen(
      page,
      limit,
      selectedBrand,
      selectedColor
    );
    res.status(200).json(productsForMen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const getProductsForWomen = async (req, res) => {
//   try {
//     const productsForWomen = await productService.getProductsForWomen();
//     res.status(200).json(productsForWomen);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const getProductsForWomen = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const selectedBrand = req.query.brand;
    const selectedColor = req.query.color;
    const productsForWomen = await productService.getProductsForWomen(
      page,
      limit,
      selectedBrand,
      selectedColor
    );
    res.status(200).json(productsForWomen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const productData = req.body;
    const result = await productService.addProduct(productData);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const result = await productService.deleteProduct(productId);

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const result = await productService.getProduct(productId);

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const editProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const productData = req.body;
    const result = await productService.editProduct(productId, productData);

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateSize = async (req, res) => {
  try {
    const sizeUpdates = req.body.sizeUpdates;
    const result = await productService.updateSize(sizeUpdates);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addOrden = async (req, res) => {
  try {
    const orderData = req.body;
    const result = await productService.addOrden(orderData);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const mostSearcher = async (req, res) => {
  try {
    const formattedMostSearchedProducts = await productService.mostSearcher();
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
    const result = await productService.incrementSearcher(productId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "Error al actualizar el contador de búsquedas" });
  }
};

const getSeccion = async (req, res) => {
  try {
    const secciones = await productService.getSeccion();
    res.status(200).json(secciones);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const getMarca = async (req, res) => {
  try {
    const marcas = await productService.getMarca();
    res.status(200).json(marcas);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const getColor = async (req, res) => {
  try {
    const colores = await productService.getColor();
    res.status(200).json(colores);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const getEstado = async (req, res) => {
  try {
    const estados = await productService.getEstado();
    res.status(200).json(estados);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const formattedOrders = await productService.getOrdersByUser(userId);
    res.status(200).json(formattedOrders);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const getDetailOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const formattedDetailOrder = await productService.getDetailOrder(orderId);
    res.status(200).json(formattedDetailOrder);
  } catch (error) {
    console.error(error.message);
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
  getDetailOrder
};
