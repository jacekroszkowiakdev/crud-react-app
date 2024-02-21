import { Router } from "express";
import * as userController from "../controllers/user.controller";

export const routes = Router();

routes.post("/login", userController.loginUser);
routes.post("/register", userController.registerUser);
