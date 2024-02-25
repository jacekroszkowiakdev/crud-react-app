import "dotenv/config";
import fs from "fs/promises";
import mongoose from "mongoose";
import Product from "../models/product.model";

const MONGO_URL = process.env.DB_CONNECTION_STRING;

const data = await fs.readFile("./hydrateData/products.json", "utf-8");
const jsonData = JSON.parse(data);

if (!MONGO_URL) {
    throw new Error("mongo url not defined");
}

const hydrateDatabase = async () => {
    try {
        mongoose
            .connect(MONGO_URL)
            .catch((err) => console.error("MongoDB connection error:", err));

        await Product.insertMany(jsonData.products);
        console.log("Database hydrated successfully!");
        await mongoose.connection.close();
    } catch (error) {
        console.error("Error hydrating database:", error);
    }
};

hydrateDatabase();
