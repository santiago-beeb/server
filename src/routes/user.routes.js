import { Router } from "express";
import { methods as userController } from "../controllers/user.controller.js";
import { checkAdminRole, requireAuth } from "../middleware/auth.handler.js";

const router = Router();

router.post("/login", userController.login);
router.post("/signup", userController.addUser);
router.patch("/active/:userId", userController.activateUser);
router.get("/document-types", userController.getDocumentTypes);
router.get("/check-admin-role", requireAuth, checkAdminRole);

export default router;
