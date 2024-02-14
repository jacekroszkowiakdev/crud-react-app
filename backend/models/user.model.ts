import mongoose from "mongoose";

export interface IUserDocument extends mongoose.Document {
    username: string;
    email: string;
    password: string;
}

const UserSchema: mongoose.Schema<IUserDocument> = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
});

export const UserModel = mongoose.model<IUserDocument>("User", UserSchema);
