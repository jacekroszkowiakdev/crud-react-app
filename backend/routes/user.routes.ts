import { Router } from "express";
import * as userController from "../controllers/user.controller";

const router = Router();

router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);

export default router;
