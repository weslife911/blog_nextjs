// src/components/Blog/CommentSection.tsx

import CommentForm from "@/forms/CommentForm";
import Comment from "./Comment";
import { useGetComments } from "@/services/queries";
import { Suspense, useState } from "react"; // ADDED: useState
import { BlogSkeletonCard } from "../Skeletons/BlogSkeletonCard";
import { useAuthStore } from "@/store/useAuthStore";
import { PaginatedComments } from "@/types/blog"; // ADDED: PaginatedComments type

const CommentSection = ({ blogId }: {
    blogId: string
}) => {
    // ADDED: State for current page, starting at 1
    const [currentPage, setCurrentPage] = useState(1);

    // UPDATED: Pass currentPage to the hook
    const commentsQuery = useGetComments(blogId, currentPage);

    // Helper to get paginated data safely
    const paginatedData: PaginatedComments | undefined = commentsQuery.data?.comments;
    const comments = paginatedData?.docs || [];
    const totalCount = paginatedData?.totalDocs || 0;
    const totalPages = paginatedData?.totalPages || 1;

    // Pagination handler
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Optional: Scroll to comments section after changing page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div className="mt-10 pt-10 border-t border-body-color border-opacity-10 dark:border-white dark:border-opacity-10">
            {/* Comment Count Header */}
            <h3 className="text-2xl font-bold text-black dark:text-white sm:text-3xl mb-8">
                {commentsQuery.isLoading ? 'Loading...' : `${totalCount} Total Comments`}
            </h3>

            {/* Main Comment Form */}
            <div className="mb-12 p-6 rounded-md bg-white dark:bg-dark shadow-three border border-stroke dark:border-transparent">
                <h4 className="mb-4 text-xl font-semibold text-black dark:text-white">
                    Leave a Comment
                </h4>
                {/* Auth Check for Comment Form */}
                <CommentForm blogId={blogId} />
            </div>

            {/* List of Comments */}
            <div className="pt-4">
                {commentsQuery.isLoading ? (
                    <BlogSkeletonCard />
                ) : comments.length > 0 ? (
                    comments.map((comment) => (
                        <Suspense key={comment._id} fallback={<BlogSkeletonCard/>}>
                            <Comment blogId={blogId} comment={comment} />
                        </Suspense>
                    ))
                ) : (
                    <p className="text-body-color dark:text-body-color-dark">No comments yet. Be the first to comment!</p>
                )}
            </div>

            {/* ADDED: Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2 pt-6">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={!paginatedData?.hasPrevPage}
                        className="rounded-md border border-stroke px-4 py-2 text-base font-medium text-body-color transition-all duration-300 disabled:opacity-50 dark:border-transparent dark:text-body-color-dark dark:bg-[#2C303B] hover:border-primary hover:bg-primary/5 hover:text-primary dark:hover:border-primary"
                    >
                        Previous
                    </button>

                    {/* Simple page numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`rounded-md px-4 py-2 text-base font-medium transition-all duration-300 ${
                                page === currentPage
                                    ? 'bg-primary text-white'
                                    : 'border border-stroke text-body-color dark:text-body-color-dark dark:border-transparent dark:bg-[#2C303B] hover:border-primary hover:bg-primary/5 hover:text-primary dark:hover:border-primary'
                            }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!paginatedData?.hasNextPage}
                        className="rounded-md border border-stroke px-4 py-2 text-base font-medium text-body-color transition-all duration-300 disabled:opacity-50 dark:border-transparent dark:text-body-color-dark dark:bg-[#2C303B] hover:border-primary hover:bg-primary/5 hover:text-primary dark:hover:border-primary"
                    >
                        Next
                    </button>
                </div>
            )}
            {/* END: Pagination Controls */}
        </div>
    );
};

export default CommentSection;
