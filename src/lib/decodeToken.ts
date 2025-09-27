import jwt from "jsonwebtoken"

export const decodeToken = (token: string) => {
    const decoded = jwt.decode(token);

    if(!decoded) return {
        success: false,
        message: "Error while decoding token"
    }

    return decoded;
};
