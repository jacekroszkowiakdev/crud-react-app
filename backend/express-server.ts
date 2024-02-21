import express, { Request, Response } from "express";
import mongoose from "./configuration/mongoose.config";
import cors from "cors";
import fs from "fs/promises";
import { Product } from "./model";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connection.once("open", () => {
    console.log("MongoDB connected");
});

const readProducts = async (): Promise<Product[]> => {
    try {
        const data = await fs.readFile("./api/db/products.json", "utf-8");
        const jsonData = JSON.parse(data);
        const products = jsonData.products as Product[];

        return products;
    } catch (error) {
        console.error("Error reading file:", error.message);
        throw new Error("Internal Server Error");
    }
};

const writeProducts = async (data: Product[]) => {
    if (Object.keys(data).length === 0) {
        return console.error(
            "Error writing products to file: data object is empty"
        );
    }
    try {
        await fs.writeFile(
            "./api/db/products.json",
            JSON.stringify({ products: data })
        );
    } catch (error) {
        console.error("Error writing products to file:", error.message);
        throw new Error("Internal Server Error");
    }
};

app.get("/api/products", async (_req: Request, res: Response) => {
    try {
        const products: Product[] = await readProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/api/products/add", async (req: Request, res: Response) => {
    try {
        let products: Product[] = await readProducts();
        const newProduct = req.body.newProduct;

        if (!newProduct) {
            return res.status(400).json({
                error: "Invalid data format. Missing data in request body.",
            });
        }
        products.push(newProduct);
        res.status(201).json({ newProduct });
        await writeProducts(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/api/products/delete/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id;

        if (!idToDelete) {
            return res.status(400).json({
                error: "Invalid data format. Missing product ID in request params.",
            });
        }
        let products: Product[] = await readProducts();
        const indexToDelete = products.findIndex(
            (product) => product.id === idToDelete
        );

        if (indexToDelete === -1) {
            return res.status(404).json({
                error: "Product not found. Cannot delete non-existent product.",
            });
        }
        products.splice(indexToDelete, 1);
        await writeProducts(products);
        res.status(200).json({
            message: `Product with ID ${idToDelete} has been successfully deleted.`,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put("/api/products/update/:id", async (req: Request, res: Response) => {
    try {
        const idToUpdate = req.params.id;
        const updatedProductData = req.body.updatedProduct;

        if (!idToUpdate || !updatedProductData) {
            return res.status(400).json({
                error: "Invalid data format. Missing product ID or updated data in request.",
            });
        }

        let products: Product[] = await readProducts();
        const indexToUpdate = products.findIndex(
            (product) => product.id === idToUpdate
        );

        if (indexToUpdate === -1) {
            return res.status(404).json({
                error: "Product not found. Cannot update non-existent product.",
            });
        }

        products[indexToUpdate] = {
            ...products[indexToUpdate],
            ...updatedProductData,
        };

        await writeProducts(products);
        res.status(200).json({
            message: `Product with ID ${idToUpdate} has been successfully updated.`,
            updatedProduct: products[indexToUpdate],
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`DB 'products' running on PORT ${port}!`);
});
