import { Router } from "express";
import {
    getAllProducts,
    addProduct,
    deleteProduct,
    updateProduct,
    deleteAllProducts,
} from "../controllers/product.controller";
import { auth } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getAllProducts);
router.post("/add", addProduct);
router.delete("/delete/:id", deleteProduct);
router.delete("/delete/all", deleteAllProducts);
router.put("/update/:id", updateProduct);
// router.post("/add", auth, addProduct);
// router.delete("/delete/:id", auth, deleteProduct);
// router.delete("/delete/all", auth, deleteAllProducts);
// router.put("/update/:id", auth, updateProduct);

export default router;
