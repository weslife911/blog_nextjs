import BlogList from "@/components/Blog/BlogList";
import { Metadata } from "next";
import { Suspense } from "react";
import { BlogSkeletonCard } from "@/components/Skeletons/BlogSkeletonCard";

export const metadata: Metadata = {
  title: "Blog Page | Free Next.js Template for Startup and SaaS",
  description: "This is Blog Page for Startup Nextjs Template",
  // other metadata
};

const Blog = () => {

  return (
    <Suspense fallback={<BlogSkeletonCard/>}>
        <BlogList/>
    </Suspense>
  );
};

export default Blog;
