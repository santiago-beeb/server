import { Router } from "express";
import { methods as productController } from "../controllers/product.controller.js";
import { checkAdminRole, requireAuth } from "../middleware/auth.handler.js";

const router = Router();

router.get("/get-products", productController.getProducts);

export default router;
