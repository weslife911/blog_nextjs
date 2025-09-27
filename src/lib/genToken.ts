import jwt from "jsonwebtoken"

const JWT_SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY;

if(!JWT_SECRET_KEY) {
    throw new Error("Add JWT_SECRET_KEY variable to your .env.local or .env file");
}

export const genToken = (userId: string) => {
    return jwt.sign({ id: userId }, JWT_SECRET_KEY, {
        expiresIn: "1d"
    });
};
