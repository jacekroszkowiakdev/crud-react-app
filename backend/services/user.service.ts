import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { DocumentDefinition } from "mongoose";
import { UserModel, IUserDocument } from "../models/user.model";

const SECRET_KEY = process.env.SECRET_KEY;

export async function register(
    user: DocumentDefinition<IUserDocument>
): Promise<void> {
    try {
        console.log("registration data before DB: ", user);
        await UserModel.create(user);
        console.log("registration data in DB: ", user);
    } catch (error) {
        console.error("Error occurred while registering user:", error);
        throw new Error("Could not register user. Please try again later.");
    }
}

export async function login(
    user: DocumentDefinition<IUserDocument>
): Promise<{ user: IUserDocument; token: string }> {
    try {
        const foundUser = await UserModel.findOne({
            username: user.username,
        });

        if (!foundUser) {
            throw new Error("Username incorrect");
        }

        console.log("typed password: ", user.password);
        console.log("db password: ", foundUser.password);
        const isMatch = bcrypt.compareSync(user.password, foundUser.password);

        if (isMatch) {
            const token = jwt.sign(
                {
                    _id: foundUser._id?.toString(),
                    username: foundUser.username,
                },
                SECRET_KEY,
                {
                    expiresIn: "2 days",
                }
            );

            return { user: foundUser, token: token };
        } else throw new Error("Password mismatch");
    } catch (error) {
        console.error("Error occurred while logging in:", error);
        throw new Error("Could not log in. Please try again later.");
    }
}
