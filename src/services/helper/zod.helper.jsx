import { errorNotify } from "..";

export const validateZodSchema = ({ schema, data, onError = errorNotify }) => {
    const parseResult = schema.safeParse(data);

    if (!parseResult.success) {
        const firstError = parseResult.error.issues[0]?.message || "Invalid input.";
        onError(firstError);
        return null;
    }

    return parseResult.data;
};