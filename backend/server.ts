import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs/promises";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

interface Product {
    id: string;
    manufacturer: string;
    year: number;
    model: string;
}

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
    try {
        await fs.writeFile(
            "./api/db/writeTest.json",
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

app.listen(port, () => {
    console.log(`DB 'products' running on PORT ${port}!`);
});
