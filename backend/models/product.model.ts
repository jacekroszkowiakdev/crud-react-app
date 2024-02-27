import mongoose, { Document } from "mongoose";

export interface IProductDocument extends Document {
    modelId: string;
    bikeModel: string;
    manufacturer: string;
    year: number;
}

const productSchema = new mongoose.Schema<IProductDocument>({
    modelId: { type: String, required: true },
    bikeModel: { type: String, required: true },
    manufacturer: { type: String, required: true },
    year: { type: Number, required: true },
});

const ProductModel = mongoose.model<IProductDocument>("Product", productSchema);

export default ProductModel;
