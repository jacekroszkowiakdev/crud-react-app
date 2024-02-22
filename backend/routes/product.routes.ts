import { Router } from "express";
import {
    getAllProducts,
    addProduct,
    deleteProduct,
} from "../controllers/product.controller";

const router = Router();

router.get("/", getAllProducts);
router.post("add", addProduct);
router.delete("delete/:id", deleteProduct);

export default router;
