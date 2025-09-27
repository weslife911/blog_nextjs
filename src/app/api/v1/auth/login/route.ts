import User from "@/models/User";
import { NextResponse } from "next/server"
import { compare } from "bcryptjs"
import { connectToDb } from "@/lib/connectToDb";
import { genToken } from "@/lib/genToken";
import { validateLoginSchema } from "@/lib/validate"

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
    await connectToDb();

    try {

        const body = await request.json();

        const validation = validateLoginSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({
                success: false,
                message: validation.error.issues[0].message
            }, { status: 400 });
        }

        const { email, password } = validation.data;

        if (!isValidEmail(email)) {
            return NextResponse.json({
                success: false,
                message: "Invalid email format."
            });
        }

        const user = await User.findOne({ email: email });

        if(!user) return NextResponse.json({
            success: false,
            message: "User with the given email does not exist"
        });

        const verifyPassword = await compare(password, user.password);

        if(!verifyPassword) return NextResponse.json({
            success: false,
            message: "Passwords do not match"
        });

        const token = genToken(user._id);

        return NextResponse.json({
            success: true,
            message: "Logged in successfully",
            token,
            user: {
                _id: user._id,
                full_name: user.full_name,
                email: user.email,
                profile_pic: user.profile_pic
            }
        });

    } catch (e: unknown) {
        if (e instanceof Error) {
            return NextResponse.json({
            success: false,
            message: e.message
            }, { status: 500 });
        } else {
            return NextResponse.json({
            success: false,
            message: "An unknown error occurred"
            }, { status: 500 });
        }
    }
}
