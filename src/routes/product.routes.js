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

export default router;
