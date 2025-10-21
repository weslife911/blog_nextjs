import * as nodemailer from "nodemailer"

const EMAIL_HOST: string | undefined = process.env.EMAIL_HOST;
const EMAIL_PORT: string | undefined = process.env.EMAIL_PORT;
const EMAIL_HOST_USER: string | undefined = process.env.EMAIL_HOST_USER;
const EMAIL_HOST_PASSWORD: string | undefined = process.env.EMAIL_HOST_PASSWORD;

if(!EMAIL_HOST || !EMAIL_PORT || !EMAIL_HOST_USER || !EMAIL_HOST_PASSWORD) {
    throw new Error("Check if your varables are cofigured correctly");
}

export const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: parseInt(EMAIL_PORT!),
    secure: false,
    requireTLS: true,
    auth: {
      user: EMAIL_HOST_USER,
      pass: EMAIL_HOST_PASSWORD
    }
});