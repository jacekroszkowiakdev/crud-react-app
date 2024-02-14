import { DocumentDefinition } from "mongoose";
import { UserModel, IUserDocument } from "../models/user.model";

export async function register(
    user: DocumentDefinition<IUserDocument>
): Promise<void> {
    try {
        await UserModel.create(user);
    } catch (error) {
        throw error;
    }
}

export async function login(user: DocumentDefinition<IUserDocument>) {
    try {
        const foundUser = await UserModel.findOne({
            username: user.username,
            password: user.password,
        });
    } catch (error) {
        throw error;
    }
}
