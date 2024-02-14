import * as userController from "../controllers/user.controller";

Router.post("/login", userController.loginOne);
Router.post("/register", userController.registerOne);
