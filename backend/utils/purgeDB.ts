import "dotenv/config";
import mongoose from "mongoose";
import Product from "../models/product.model";

const MONGO_URL = process.env.DB_CONNECTION_STRING;

if (!MONGO_URL) {
    throw new Error("mongo url not defined");
}

// Function to delete all documents from the database
const deleteAllDocuments = async () => {
    try {
        mongoose
            .connect(MONGO_URL)
            .catch((err) => console.error("MongoDB connection error:", err));

        await Product.deleteMany({});
        console.log("All documents deleted successfully");
        await mongoose.connection.close();
    } catch (error) {
        console.error("Error deleting documents:", error);
    }
};

deleteAllDocuments();
