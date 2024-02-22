import "dotenv/config";
import mongoose from "mongoose";
import Product from "../models/product.model";

const MONGO_URL = process.env.DB_CONNECTION_STRING;

const jsonData = {
    products: [
        { manufacturer: "Cannondale", year: 2019, bikeModel: "Caad12" },
        { manufacturer: "Marin", year: 2017, bikeModel: "Gestalt3" },
        { manufacturer: "Felt", year: 2018, bikeModel: "Z75" },
        { manufacturer: "Specialized", year: 2022, bikeModel: "Crux" },
        { manufacturer: "Felt", year: 2018, bikeModel: "Z85" },
        { manufacturer: "Cannondale", year: 2022, bikeModel: "Caad13" },
        { manufacturer: "Marin", year: 2018, bikeModel: "Nicasio" },
        { manufacturer: "Marin", year: 2022, bikeModel: "Nicasio2" },
        { manufacturer: "Rondo", year: 2023, bikeModel: "HRVT" },
        { manufacturer: "Rondo", year: 2020, bikeModel: "Rut" },
    ],
};

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
    } catch (error) {
        console.error("Error hydrating database:", error);
    }
};

hydrateDatabase();
