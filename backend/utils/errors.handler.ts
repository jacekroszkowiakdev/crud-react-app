export const getErrorMessage = (error: Error): string => {
    if (error instanceof Error) return error.message;
    else return String(error);
};

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(error.stack);
    res.status(500).json({ error: "Internal Server Error" });
};
