import axios from "axios"

const API_URL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

if(!API_URL) {
    throw new Error("Add API_URL variable in you .env or .env.local file");
}

export const axiosInstance = axios.create({
    baseURL: API_URL
});
