import dotenv from "dotenv";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs/promises";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

interface Product {
    id: number;
    manufacturer: string;
    year: number;
    model: string;
}

const readProducts: () => Promise<Product[]> = async () => {
    try {
        const data = await fs.readFile("./api/db/products.json", "utf-8");
        console.log("File content:", data);
        const jsonData = JSON.parse(data);
        const products = jsonData.products as Product[];

        return products;
    } catch (error) {
        console.error("Error reading file:", error.message);
        throw error;
    }
};

const writeProducts = async (data: Product[]) => {
    try {
        await fs.writeFile(
            "./api/db/products.json",
            JSON.stringify({ products: data })
        );
        console.log("Products have been successfully written to the file.");
        console.log("Products updated:", JSON.stringify(data));
    } catch (error) {
        console.error("Error writing products to file:", error.message);
        throw error;
    }
};

// get all existing products
app.get("/api/products", async (_req: Request, res: Response) => {
    const products: Product[] = await readProducts();
    res.json(products);
});

// Add product
app.post("/api/products/add", async (req: Request, res: Response) => {
    let products: Product[] = await readProducts();
    const newProduct = req.body.newProduct;

    console.log("BODY new Product:", req.body.newProduct);

    if (!newProduct) {
        return res.status(400).json({
            error: "Invalid data format. Missing data in request body.",
        });
    }
    products.push(newProduct);

    console.log("products arr updated", products);

    res.status(201).json({ newProduct });
    writeProducts(products);
    // res.json(newProduct);

    console.log("Products updated:", products);
});

app.listen(port, () => {
    console.log(`DB 'products' running on PORT ${port}!`);
});
