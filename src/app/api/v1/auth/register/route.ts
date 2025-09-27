import User from "@/models/User";
import { NextResponse } from "next/server"
import { genSalt, hash } from "bcryptjs"
import connectToDb from "@/lib/connectToDb";
import genToken from "@/lib/genToken";
import { validateSignupSchema } from "@/lib/validate"

export async function POST(request: Request) {

    await connectToDb();

    try {
        const body = await request.json();

        const validation = validateSignupSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({
                success: false,
                message: validation.error.issues[0].message
            }, { status: 400 });
        }

        const { full_name, email, password } = validation.data;

        const checkEmail = await User.findOne({ email });
        if(checkEmail) return NextResponse.json({
            success: false,
            message: "User with the same email exists already!"
        });

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        const newUser = await new User({
            full_name,
            email,
            password: hashedPassword,
            authType: body.authType || "email",
            isVerified: body.isVerified || false,
            emailVerificationToken: body.emailVerificationToken || "",
            profile_pic: `https://avatar.iran.liara.run/username?username=${full_name}`
        });

        if(!newUser) return NextResponse.json({
            success: false,
            message: "Error while creating user!"
        });

        const token = genToken(newUser._id);

        await newUser.save();

        return NextResponse.json({
            success: true,
            message: "User created successfully",
            token,
            newUser: {
                _id: newUser._id,
                full_name: newUser.full_name,
                email: newUser.email,
                profile_pic: newUser.profile_pic
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
