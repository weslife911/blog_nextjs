import { connect } from "mongoose"

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

if(!MONGODB_URI) {
    throw new Error("Add MONGODB_URI variable to your .env or .env.local file");
}

export const connectToDb = async() => {
    await connect(MONGODB_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((e) => console.log(e));
};
