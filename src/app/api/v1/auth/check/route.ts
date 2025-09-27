import { NextRequest, NextResponse } from 'next/server';
import { connectToDb } from '@/lib/connectToDb'; // Adjust path as needed
import User from '@/models/User'; // Adjust path as needed
import jwt from "jsonwebtoken"

export async function GET(request: NextRequest) {
    await connectToDb();

    const url = new URL(request.url);
    const token = url.searchParams.get("auth_token");

    try {

        if (!token) {
            return NextResponse.json({
                success: false,
                message: "Token is required"
            }, { status: 400 });
        }

        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

        if(!JWT_SECRET_KEY) return NextResponse.json({
            success: false,
            message: "JWT_SECRET_KEY variable not set in .env or .env.local file"
        });

        const decoded: any = jwt.verify(token, JWT_SECRET_KEY);

        if(!decoded) return NextResponse.json({
                success: false,
                message: "Error while decoding token"
            }, { status: 400 });

        const user = await User.findById(decoded.id);

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User with given ID does not exist"
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            user
        });

    } catch (e: unknown) {
        console.error('Verification error:', e);

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
