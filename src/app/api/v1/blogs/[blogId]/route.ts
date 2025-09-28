import { NextRequest, NextResponse } from "next/server"
import Blog from "@/models/Blog"
import { connectToDb } from "@/lib/connectToDb";

interface Context {
    params: {
        blogId: string;
    };
}

export async function GET(request: NextRequest, context: Context) {

    await connectToDb();

    try {

        const { blogId } = context.params;

        if (!blogId) {
            return NextResponse.json({
                success: false,
                message: "Blog ID is missing."
            }, { status: 400 });
        }

        const blog = await Blog.findById(blogId).populate({
            path: 'blogAuthorID',
            select: 'full_name profile_pic email'
        });

        if (!blog) {
            return NextResponse.json({
                success: false,
                message: "Blog not found."
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            blog
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
            message: "An error occurred while fetching the blog."
            }, { status: 500 });
        }
    }
}
