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

// Ruta para agregar productos (solo accesible por administradores)
router.post("/product-add", requireAuth, productController.addProduct);

// Ruta para eliminar un producto específico (solo accesible por administradores)
router.delete(
  "/product-delete/:productId",
  requireAuth,
  productController.deleteProduct
);

router.get("/seccion", requireAuth, productController.getSeccion);
router.get("/marca", requireAuth, productController.getMarca);
router.get("/color", requireAuth, productController.getColor);
router.get("/estado", requireAuth, productController.getEstado);

export default router;
