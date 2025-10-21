import { transporter } from "@/lib/transporter";
import { validateContactSchema } from "@/lib/validate";
import { NextResponse, NextRequest } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const validation = await validateContactSchema.safeParse(body);

        if(!validation.success) return NextResponse.json({
            success: false,
            message: validation.error.issues[0].message
        });

        const { full_name, email, message } = validation.data;

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_HOST_USER,
            subject: `New message from ${full_name} | ${email}`,
            text: message,
            html: `
                <p><strong>From:</strong> (${full_name})</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({
            success: true,
            message: "Email sent successfully"
        });
    } catch (error) {

        if (error instanceof Error) {
        return NextResponse.json({
            success: false,
            message: `Error: ${error.message}`
        }, { status: 500 });
        } else {
        return NextResponse.json({
            success: false,
            message: "An unknown error occurred during processing"
        }, { status: 500 });
        }
    }

}