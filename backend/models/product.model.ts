import mongoose, { Document } from "mongoose";

export interface IProduct extends Document {
    modelId: string;
    bikeModel: string;
    manufacturer: string;
    year: number;
}

const productSchema = new mongoose.Schema<IProduct>({
    modelId: { type: String, required: true },
    bikeModel: { type: String, required: true },
    manufacturer: { type: String, required: true },
    year: { type: Number, required: true },
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
