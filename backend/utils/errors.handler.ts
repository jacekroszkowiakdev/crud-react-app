export const getErrorMessage = (error: Error): string => {
    if (error instanceof Error) return error.message;
    else return String(error);
};
