import { NextResponse } from "next/server";
import Blog from "@/models/Blog";
import { connectToDb } from "@/lib/connectToDb";

export async function GET(
  { params }: { params: { blogId: string } }
) {
  await connectToDb();

  try {
    const { blogId } = params;

    if (!blogId) {
      return NextResponse.json(
        { success: false, message: "Blog ID is missing." },
        { status: 400 }
      );
    }

    const blog = await Blog.findById(blogId).populate({
      path: "blogAuthorID",
      select: "full_name profile_pic email",
    });

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog fetched successfully!",
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return NextResponse.json(
        { success: false, message: e.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "An error occurred while fetching the blog.",
        },
        { status: 500 }
      );
    }
  }
}
