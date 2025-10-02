// src/components/Blog/BlogList.tsx

"use client"

import CreateBlogButton from "@/components/Blog/CreateBlogButton";
import SingleBlog from "@/components/Blog/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useGetBlogs } from "@/services/queries";
import { Suspense, useState, useMemo } from "react"; // ADDED: useState, useMemo
import { BlogSkeletonCard } from "../Skeletons/BlogSkeletonCard";
import { PaginatedBlogs, Blog } from "@/types/blog"; // ADDED: Types

export default function BlogList() {
    // State to track the current page number
    const [currentPage, setCurrentPage] = useState(1);
    const pageString = String(currentPage);

    // Fetch blogs for the current page
    const blogsQuery = useGetBlogs(pageString);

    // Safely extract paginated data and blogs array
    const paginatedData: PaginatedBlogs | undefined = blogsQuery.data?.blogs as PaginatedBlogs | undefined;
    const blogs: Blog[] = paginatedData?.docs || [];
    const totalPages = paginatedData?.totalDocs || 1;

    // Generate array of page numbers to display
    const pageNumbers = useMemo(() => {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }, [totalPages]);

    // Function to handle page change
    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 300, behavior: 'smooth' });
        }
    };


    return (
        <>
      <Breadcrumb
        pageName="Blog Grid"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />

      <section className="pb-[120px] pt-[120px]">
    <div className="container">
        <div className="flex flex-wrap justify-center -mx-4">

            <CreateBlogButton/>

            {blogsQuery.isLoading ? (
                // Display skeleton cards while loading
                Array.from({ length: 3 }).map((_, index) => (
                    <div
                        key={index}
                        className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
                    >
                        <BlogSkeletonCard />
                    </div>
                ))
            ) : blogs.length > 0 ? (
                blogs.map((blog) => (
                    <div
                        key={blog._id}
                        className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
                    >
                        <Suspense fallback={<BlogSkeletonCard/>}>
                            <SingleBlog blog={blog} />
                        </Suspense>
                    </div>
                ))
            ) : (
                 // Display no results message
                <div className="w-full px-4 text-center py-10">
                    <p className="text-body-color dark:text-body-color-dark">No blog posts found.</p>
                </div>
            )}
          </div>

          {/* ADDED: Pagination Controls */}
          {totalPages > 1 && (
            <div
                className="wow fadeInUp -mx-4 flex flex-wrap"
                data-wow-delay=".15s"
            >
                <div className="w-full px-4">
                    <ul className="flex items-center justify-center pt-8">
                        {/* Previous Button */}
                        <li className="mx-1">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={!paginatedData?.hasPrevPage}
                                className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed dark:bg-[#2C303B] dark:hover:bg-primary"
                            >
                                Previous
                            </button>
                        </li>

                        {/* Page Numbers */}
                        {pageNumbers.map((page) => (
                            <li key={page} className="mx-1">
                                <button
                                    onClick={() => handlePageChange(page)}
                                    className={`flex h-9 min-w-[36px] items-center justify-center rounded-md px-4 text-sm transition ${
                                        page === currentPage
                                            ? 'bg-primary text-white'
                                            : 'bg-body-color bg-opacity-[15%] text-body-color hover:bg-primary hover:bg-opacity-100 hover:text-white dark:bg-[#2C303B] dark:hover:bg-primary'
                                    }`}
                                >
                                    {page}
                                </button>
                            </li>
                        ))}

                        {/* Next Button */}
                        <li className="mx-1">
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={!paginatedData?.hasNextPage}
                                className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed dark:bg-[#2C303B] dark:hover:bg-primary"
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            )}
            {/* End of Pagination Controls */}
        </div>
      </section>
    </>
    );
}
