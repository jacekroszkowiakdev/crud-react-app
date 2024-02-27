import { DocumentDefinition } from "mongoose";
import ProductModel, { IProductDocument } from "../models/product.model";
import { updateProduct } from "../controllers/product.controller";

export async function findAll(): Promise<IProductDocument[] | null> {
    try {
        const products = await ProductModel.find();
        return products;
    } catch (error) {
        console.error(
            "Error occurred while fetching all products from the database"
        );
        throw new Error(
            "Could not fetch products form the database. Please try again later."
        );
    }
}

export async function createOne(
    newProductData: IProductDocument
): Promise<IProductDocument> {
    try {
        const newProduct = await ProductModel.create(newProductData);
        return newProduct;
    } catch (error) {
        console.error(
            "Error occurred while creating new product in the database"
        );
        throw new Error(
            "Could not create new product document. Please try again later."
        );
    }
}

export async function updateOne(
    id: string,
    updatedProductData: IProductDocument
): Promise<IProductDocument> {
    try {
        const updatedProduct = await ProductModel.findOneAndUpdate(
            {
                modelId: id,
            },
            updatedProductData
        );
        return updatedProduct;
    } catch (error) {
        console.error(
            "Error occurred while updating product properties in the database"
        );
        throw new Error(
            "Could not update product document. Please try again later."
        );
    }
}

export async function deleteOne(id: string): Promise<IProductDocument> {
    try {
        const productToDelete = await ProductModel.findOneAndDelete({
            modelId: id,
        });
        return productToDelete;
    } catch (error) {
        console.error(
            "Error occurred while deleting selected product from the database"
        );
        throw new Error(
            "Could not delete product form the database. Please try again later."
        );
    }
}

export async function deleteAll(): Promise<IProductDocument[] | null> {
    try {
        const allProductsToDelete = await ProductModel.deleteMany({});
        return null;
    } catch (error) {
        console.error(
            "Error occurred while deleting selected product from the database"
        );
        throw new Error(
            "Could not delete product from the database. Please try again later."
        );
    }
}
