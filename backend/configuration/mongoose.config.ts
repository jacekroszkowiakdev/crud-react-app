import "dotenv/config";
import mongoose from "mongoose";

const MONGO_URL = process.env.DB_CONNECTION_STRING;

if (!MONGO_URL) {
    throw new Error("mongo url not defined");
}

mongoose
    .connect(MONGO_URL)
    .catch((err) => console.error("MongoDB connection error:", err));

export default mongoose;
