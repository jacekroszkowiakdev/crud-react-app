import "dotenv/config";
import mongoose from "mongoose";
import ProductModel from "../models/product.model";

const MONGO_URL = process.env.DB_CONNECTION_STRING;

if (!MONGO_URL) {
    throw new Error("mongo url not defined");
}

const deleteAllDocuments = async () => {
    try {
        mongoose
            .connect(MONGO_URL)
            .catch((err) => console.error("MongoDB connection error:", err));

        await ProductModel.deleteMany({});
        console.log("All documents deleted successfully");
        await mongoose.connection.close();
    } catch (error) {
        console.error("Error deleting documents:", error);
    }
};

deleteAllDocuments();
