import mongoose from "mongoose";
import "dotenv/config";

export const MONGO_URL: String = process.env.DB_CONNECTION_STRING;

if (!process.env.MONGO_URL) {
    throw new Error("mongo url not defined");
}
mongoose
    .connect("mongodb://localhost:27017/auth_example", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

module.exports = mongoose;
