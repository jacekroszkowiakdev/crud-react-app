import { Request, Response } from "express";
import Product from "../models/product.model";

export const getAllProducts = async (_req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const addProduct = async (req: Request, res: Response) => {
    try {
        const newProduct = await Product.create(req.body.newProduct);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({
            modelId: req.params.id,
        });
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            {
                modelId: req.params.id,
            },
            req.body.updatedProduct
        );
        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
