import dotenv from "dotenv";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";

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

// Read from JSON file
const readProducts = () => {
    try {
        const data = fs.readFileSync("./api/db/products.json", "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Write products to JSON file
const writeProducts = (products: any[]) => {
    fs.writeFileSync(
        "./api/db/products.json",
        JSON.stringify(products, null, 2),
        "utf-8"
    );
};

app.get("/api/products", (_req: Request, res: Response) => {
    const products: Product[] = readProducts();
    res.json(products);
});

// Add product
app.post("/api/products/add", (req: Request, res: Response) => {
    let products: Product[] = [];
    products = readProducts();
    console.log("products arr:", products);
    const newProduct = req.body.newProduct;
    console.log("BODY new Product:", req.body.newProduct);

    if (!newProduct) {
        return res.status(400).json({
            error: "Invalid data format. Missing newProduct in request body.",
        });
    }

    // Assuming newProduct is an object with id, manufacturer, year, and model properties
    // You may want to perform additional validation and processing here

    products.push(newProduct);
    console.log("products arr updated", products);

    res.status(201).json({ newProduct });
    // const newProduct = req.body.newProduct;
    // // newProduct.id = products.length + 1;
    // console.log("new Product:", newProduct);
    // products.push(newProduct);
    // writeProducts(products);
    // res.json(newProduct);
    // console.log("Products updated:", products);
});

app.listen(port, () => {
    console.log(`DB 'products' running on PORT ${port}!`);
});
