import { connectToDb } from "@/lib/connectToDb";
import { validateCommentSchema } from "@/lib/validate";
import Comment from "@/models/Comment";
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: Request) {

    await connectToDb();

    try {

        const body = await request.json();

        const validation = validateCommentSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({
                success: false,
                message: validation.error.issues[0].message
            }, { status: 400 });
        }

        const { user, blog, comment } = validation.data;

        const newComment = await new Comment({
            user,
            blog,
            comment
        });

        if(!newComment) return NextResponse.json({
            success: false,
            message: "Error while creating comment!"
        });

        await newComment.save()

        return NextResponse.json({
            success: true,
            message: "Comment created successfully!"
        })

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

export async function GET(request: NextRequest) {
    await connectToDb();
    try {

        const url = new URL(request.url);
        // ADDED: Retrieve page parameter
        const page = url.searchParams.get("page");
        const limit = url.searchParams.get("limit");

        const options = {
            // UPDATED: Use page and limit from URL, or default to 1 and 3
            page: parseInt(page as string) || 1,
            limit: parseInt(limit as string) || 3,
            sort: { createdAt: -1 },
            populate: [
                {
                    path: 'user',
                    select: 'full_name profile_pic email'
                },
                {
                    path: "blog",
                    select: "blogTitle blogContent blogImage blogAuthorID blogTags blogViews"
                }
            ]
        }

        // UPDATED: Use a filter to return only top-level comments (assuming replies have a parent ID, but since your schema doesn't show it, we'll rely on the existing pagination)
        const comments = await Comment.paginate({}, options);

        if(!comments.docs || comments.docs.length === 0) return NextResponse.json({
            success: false,
            message: "No blogs available at the moment!"
        }, { status: 200 });

        return NextResponse.json({
            success: true,
            comments
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
