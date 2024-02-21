import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors.handler";
import * as userServices from "../services/user.service";
import { CustomRequest } from "../middleware/auth.middleware";

export const loginUser = async (req: Request, res: Response) => {
    try {
        const foundUser = await userServices.login(req.body);
        res.status(200).send(foundUser);
    } catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
};

export const registerUser = async (req: Request, res: Response) => {
    try {
        await userServices.register(req.body);
        res.status(200).send("Inserted successfully");
    } catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
};
