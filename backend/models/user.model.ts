import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

UserSchema.pre("save", async function save(next) {
    const SALT_WORK_FACTOR = 10;
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

export const UserModel = mongoose.model<IUserDocument>("User", UserSchema);
