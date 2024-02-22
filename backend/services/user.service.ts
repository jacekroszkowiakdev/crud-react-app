import { DocumentDefinition } from "mongoose";
import { UserModel, IUserDocument } from "../models/user.model";

export async function register(
    user: DocumentDefinition<IUserDocument>
): Promise<void> {
    try {
        await UserModel.create(user);
    } catch (error) {
        console.error("Error occurred while registering user:", error);
        throw new Error("Could not register user. Please try again later.");
    }
}

export async function login(
    user: DocumentDefinition<IUserDocument>
): Promise<IUserDocument | null> {
    try {
        // Hash password before querying (assuming you have a password hashing function)
        // Example:
        // user.password = hashPassword(user.password);

        const foundUser = await UserModel.findOne({
            username: user.username,
            password: user.password, // This should be hashed
        });

        return foundUser;
    } catch (error) {
        console.error("Error occurred while logging in:", error);
        throw new Error("Could not log in. Please try again later.");
    }
}
