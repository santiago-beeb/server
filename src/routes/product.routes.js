// En tu archivo de rutas
import { Router } from "express";
import { methods as productController } from "../controllers/product.controller.js";
import { checkAdminRole, requireAuth } from "../middleware/auth.handler.js";

const router = Router();

// Ruta para obtener todos los productos
router.get("/products", productController.getProducts);

// Nueva ruta para obtener productos para hombres
router.get("/products-for-men", productController.getProductsForMen);

// Nueva ruta para obtener productos para mujeres
router.get("/products-for-women", productController.getProductsForWomen);

// Ruta para obtener un producto
router.get("/product/:productId", productController.getProduct);

// Nueva ruta para obtener los productos mas buscados
router.get("/most-searcher", productController.mostSearcher);

// Ruta para incrementar el contador de búsquedas para un producto específico
router.post("/product-search/:id", productController.incrementSearcher);

// Ruta para agregar productos (solo accesible por administradores)
router.post("/product-add", requireAuth, productController.addProduct);

// Ruta para eliminar un producto específico (solo accesible por administradores)
router.delete(
  "/product-delete/:productId",
  requireAuth,
  productController.deleteProduct
);

// Ruta para editar un producto específico (solo accesible por administradores)
router.patch(
  "/product-edit/:productId",
  requireAuth,
  productController.editProduct
);

// Ruta para agregar orden
router.post("/order", productController.addOrden);

// Ruta para editar una talla
router.patch("/update-sizes", productController.updateSize);

// Ruta para obtener todas las ordenes
router.get("/orders/:userId", productController.getOrdersByUser);

// Ruta para obtener detalle de ordenes
router.get("/detail-order/:orderId", productController.getDetailOrder);

router.get("/seccion", productController.getSeccion);
router.get("/marca", productController.getMarca);
router.get("/color", productController.getColor);
router.get("/estado", productController.getEstado);

export default router;
