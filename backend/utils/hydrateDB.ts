import "dotenv/config";
import mongoose from "mongoose";
import Product from "../models/product.model";

const MONGO_URL = process.env.DB_CONNECTION_STRING;

const jsonData = {
    products: [
        {
            modelId: "1",
            bikeModel: "Caad12",
            manufacturer: "Cannondale",
            year: 2019,
        },
        {
            modelId: "2",
            bikeModel: "Gestalt3",
            manufacturer: "Marin",
            year: 2017,
        },
        {
            modelId: "3",
            bikeModel: "Z75",
            manufacturer: "Felt",
            year: 2018,
        },
        {
            modelId: "4",
            bikeModel: "Crux",
            manufacturer: "Specialized",
            year: 2022,
        },
        {
            modelId: "5",
            bikeModel: "Z75",
            manufacturer: "Felt",
            year: 2018,
        },
        {
            modelId: "6",
            bikeModel: "Caad13",
            manufacturer: "Cannondale",
            year: 2022,
        },
        {
            modelId: "7",
            bikeModel: "Nicasio",
            manufacturer: "Marin",
            year: 2018,
        },
        {
            modelId: "8",
            bikeModel: "Nicasio2",
            manufacturer: "Marin",
            year: 2022,
        },
        {
            modelId: "9",
            bikeModel: "HRVT",
            manufacturer: "Rondo",
            year: 2023,
        },
        {
            modelId: "10",
            bikeModel: "Rut",
            manufacturer: "Rondo",
            year: 2020,
        },
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
        await mongoose.connection.close();
    } catch (error) {
        console.error("Error hydrating database:", error);
    }
};

hydrateDatabase();
