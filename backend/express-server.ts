import "dotenv/config";
import express from "express";
import mongoose from "./configuration/mongoose.config";
import cors from "cors";
import productRoutes from "./routes/product.routes";
import userRoutes from "./routes/user.routes";
// import { errorHandler } from "./utils/errors.handler";

mongoose.connection.once("open", () => {
    console.log("MongoDB connected");
});

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
// app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
