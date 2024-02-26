import { Router } from "express";
import {
    getAllProducts,
    addProduct,
    deleteProduct,
    updateProduct,
} from "../controllers/product.controller";

const router = Router();

router.get("/", getAllProducts);
router.post("/add", addProduct);
router.delete("/delete/:id", deleteProduct);
router.put("/update/:id", updateProduct);

export default router;
