import mongoose from "mongoose";
import "dotenv/config";

console.log(process.env.DB_CONNECTION_STRING);
const MONGO_URL = process.env.DB_CONNECTION_STRING;

if (!MONGO_URL) {
    throw new Error("mongo url not defined");
}
mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

export default mongoose;
