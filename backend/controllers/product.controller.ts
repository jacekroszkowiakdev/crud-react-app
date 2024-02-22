import { Request, Response } from "express";
import Product from "../models/product.model";

export const getAllProducts = async (_req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
        console.log(products);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const addProduct = async (req: Request, res: Response) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
