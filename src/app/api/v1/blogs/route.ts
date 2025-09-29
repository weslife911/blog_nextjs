import { NextRequest, NextResponse } from 'next/server';

import { connectToDb } from "@/lib/connectToDb";
import { validateBlogSchema } from "@/lib/validate";
import Blog from "@/models/Blog";
import cloudinary from '@/lib/cloudinary';


export async function POST(request: NextRequest) {
  await connectToDb();

  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    // Get other blog data from FormData
    const blogTitle = data.get('blogTitle') as string;
    const blogContent = data.get('blogContent') as string;
    const blogAuthorID = data.get('blogAuthorID') as string;
    const blogCategory = data.get('blogCategory') as string;
    const blogTagsString = data.get('blogTags') as string;

    // Convert comma-separated tags to array
    const blogTags = blogTagsString ? blogTagsString.split(',').map(tag => tag.trim()) : [];

    let blogImageUrl = null;

    // Handle file upload if file exists
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({
          success: false,
          message: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.'
        }, { status: 400 });
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        return NextResponse.json({
          success: false,
          message: 'File size too large. Maximum size is 5MB.'
        }, { status: 400 });
      }

      // 1. Convert File to base64 buffer for Cloudinary upload
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Data = `data:${file.type};base64,${buffer.toString('base64')}`;

      // 2. Upload to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(base64Data, {
        folder: 'nextjs_blog_uploads', // Define a folder in Cloudinary
        resource_type: 'auto',
      });

      // 3. Set the public URL path from Cloudinary's response
      blogImageUrl = uploadResult.secure_url;

      // REMOVED: All local file system logic (mkdir, writeFile, join, existsSync, etc.)
    }

    // Validate blog data using your existing schema
    const blogData = {
      blogTitle,
      blogContent,
      blogImage: blogImageUrl,
      blogAuthorID,
      blogCategory,
      blogTags
    };

    const validation = validateBlogSchema.safeParse(blogData);

    if (!validation.success) {
      return NextResponse.json({
        success: false,
        message: validation.error.issues[0].message
      }, { status: 400 });
    }

    // Create new blog in database
    const newBlog = new Blog({
      blogTitle: validation.data.blogTitle,
      blogContent: validation.data.blogContent,
      blogImage: validation.data.blogImage,
      blogAuthorID: validation.data.blogAuthorID,
      blogCategory: validation.data.blogCategory,
      blogTags: validation.data.blogTags
    });

    await newBlog.save();

    return NextResponse.json({
      success: true,
      message: 'Blog created successfully!'
    });

  } catch (error) {
    console.error('Error:', error);

    if (error instanceof Error) {
      return NextResponse.json({
        success: false,
        message: `Cloudinary/Server Error: ${error.message}`
      }, { status: 500 });
    } else {
      return NextResponse.json({
        success: false,
        message: "An unknown error occurred during processing"
      }, { status: 500 });
    }
  }
}

export async function GET(request: NextRequest) {

    await connectToDb();

    try {

        const url = new URL(request.url);
        const page = url.searchParams.get("page");
        const limit = url.searchParams.get("limit");

        const options = {
            page: parseInt(page as string) || 1,
            limit: parseInt(limit as string) || 3,
            sort: { createdAt: -1 },
            populate: {
                path: 'blogAuthorID',
                select: 'full_name profile_pic email'
            }
        }

        const result =  await Blog.paginate({}, options);

        if(!result.docs || result.docs.length === 0) return NextResponse.json({
            success: false,
            message: "No blogs available at the moment!"
        }, { status: 200 });

        return NextResponse.json({
            success: true,
            blogs: result
        });

    } catch (error) {
    console.error('Error:', error);

    if (error instanceof Error) {
      return NextResponse.json({
        success: false,
        message: `Cloudinary/Server Error: ${error.message}`
      }, { status: 500 });
    } else {
      return NextResponse.json({
        success: false,
        message: "An unknown error occurred during processing"
      }, { status: 500 });
    }
  }
}
