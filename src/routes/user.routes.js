import { Router } from "express";
import { methods as userController } from "../controllers/user.controller.js";

const router = Router();

router.get("/", userController.getUser);
router.post("/login", userController.login);
//router.delete("/:id", userController.deletePark);
//router.put("/:id", userController.updatePark);
//router.get("/:id", userController.getPark);
router.post("/signup", userController.addUser);

export default router;
