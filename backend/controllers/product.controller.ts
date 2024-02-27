import { Request, Response } from "express";
import ProductModel from "../models/product.model";
import { getErrorMessage } from "../utils/errors.handler";
import * as productsServices from "../services/product.service";

export const getAllProducts = async (_req: Request, res: Response) => {
    try {
        const products = await productsServices.findAll();
        res.json(products);
    } catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
};

//AUTH routes:
export const addProduct = async (req: Request, res: Response) => {
    try {
        const newProduct = await productsServices.createOne(
            req.body.newProduct
        );
        res.status(201).json(newProduct);
    } catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const updatedProduct = await productsServices.updateOne(
            req.params.id,
            req.body.updatedProduct
        );
        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product updated successfully" });
    } catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const deletedProduct = await productsServices.deleteOne(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
};

export const deleteAllProducts = async (req: Request, res: Response) => {
    try {
        // await ProductModel.deleteMany({});
        await productsServices.deleteAll();
        res.json({ message: "All products deleted successfully" });
    } catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
};
