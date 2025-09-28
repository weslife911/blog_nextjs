import { Metadata } from "next";
import BlogDetailsClient from "@/components/Blog/BlogDetailsClient";

export const metadata: Metadata = {
  title: "Blog Details Page | Free Next.js Template for Startup and SaaS",
  description: "This is Blog Details Page for Startup Nextjs Template",
  // other metadata
};

const BlogDetailsPage = async({ params }: {
    params: Promise<{ blogId: string}>
}) => {

    const { blogId } = await params;

  return (
    <>
        <BlogDetailsClient blogId={blogId} />
    </>
  );
};

export default BlogDetailsPage;
