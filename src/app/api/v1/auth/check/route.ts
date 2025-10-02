import { NextRequest, NextResponse } from 'next/server';
import { connectToDb } from '@/lib/connectToDb';
import User from '@/models/User';
import jwt from "jsonwebtoken"

interface DecodedToken {
    user: {
        _id: string;
        id?: string; // Add id as optional for robustness
    };
    // Add other properties if your token contains them
}

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

        // The jwt.verify function will throw an error if the token is invalid/expired.
        const decoded = jwt.verify(token, JWT_SECRET_KEY) as DecodedToken;

        if(!decoded) {
             // This check is redundant since verify throws, but kept for clarity
            return NextResponse.json({
                success: false,
                message: "Error while decoding token"
            }, { status: 400 });
        }

        // ⬅️ CRITICAL FIX: The token payload is likely { user: { _id: '...' } }.
        // We must extract the ID from the nested object. Using _id (Mongoose default)
        const userId = decoded.user?._id || decoded.user?.id || decoded.id; // Fallback to id/decoded.id for robustness

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "User ID not found in token payload"
            }, { status: 400 });
        }

        // ⬅️ UPDATED: Use the correctly extracted userId
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User with given ID does not exist"
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            user // Returns the user object
        });

    } catch (e: unknown) {
        console.error('Verification/Fetch error:', e);

        // Explicitly handle JWT errors (like expiration) by returning null data
        if (e instanceof jwt.JsonWebTokenError || e instanceof jwt.TokenExpiredError) {
             return NextResponse.json({
                success: false,
                message: `Authentication failed: ${e.message}`
            }, { status: 401 });
        }

        // Existing error handling
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
