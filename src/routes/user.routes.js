import { Router } from "express";
import { methods as userController } from "../controllers/user.controller.js";

const router = Router();

router.post("/login", userController.login);
router.post("/signup", userController.addUser);
router.get("/document-types", userController.getDocumentTypes);

export default router;
