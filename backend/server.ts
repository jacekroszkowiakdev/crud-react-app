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

app.get("/api/products", (_req: Request, res: Response) => {
    try {
        const productsRawData = fs.readFileSync(
            "./api/db/products.json",
            "utf-8"
        );
        const products = JSON.parse(productsRawData);

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`DB 'products' running on PORT ${port}!`);
});
