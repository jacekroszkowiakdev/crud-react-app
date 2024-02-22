import mongoose, { Document } from "mongoose";

export interface IProduct extends Document {
    manufacturer: string;
    year: number;
    bikeModel: string;
}

const productSchema = new mongoose.Schema<IProduct>({
    manufacturer: { type: String, required: true },
    year: { type: Number, required: true },
    bikeModel: { type: String, required: true },
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
