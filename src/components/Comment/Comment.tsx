// src/components/Blog/Comment.tsx

"use client"

import ReplyForm from "@/forms/ReplyForm";
import { formatMongoDate } from "@/lib/formatDate";
import { Comment as CommentType, Reply } from "@/types/blog";
import Image from "next/image";
import { Suspense, useState } from "react";
import { BlogSkeletonCard } from "../Skeletons/BlogSkeletonCard";
import MDEditor from "@uiw/react-md-editor";
import { useAuthStore } from "@/store/useAuthStore";

const Comment = ({ comment, isReply = false, blogId }: { comment: CommentType | Reply, isReply?: boolean, blogId: string }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);

    const { authUser } = useAuthStore();

    return (
        <Suspense fallback={<BlogSkeletonCard/>}>
            <div className={`flex ${isReply ? "mt-4 ml-10 border-l pl-4 border-gray-200 dark:border-gray-700" : "mb-8 pb-4 border-b border-body-color border-opacity-5 dark:border-white dark:border-opacity-5"}`}>
            <div className="flex-shrink-0 mr-4">
                {/* Profile Picture */}
                <Image
                    src={comment.user.profile_pic}
                    alt={comment.user.full_name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                />
            </div>
            <div className="flex-grow">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h5 className="text-base font-semibold text-black dark:text-white">
                        {comment.user.full_name}
                    </h5>
                    <span className="text-sm text-body-color dark:text-body-color-dark/80">{formatMongoDate(comment.createdAt)}</span>
                </div>

                {/* Message */}
                <div className="mt-1 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                    <MDEditor.Markdown
                        source={comment.comment}
                    />

                </div>

                {/* Reply Button (Only for main comments) */}
                {!isReply && (
                    <button
                        onClick={() => setShowReplyForm(!showReplyForm)}
                        className="mt-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                        {showReplyForm ? "Cancel Reply" : "Reply"}
                    </button>
                )}

                {/* Reply Form Toggle */}
                {!isReply && showReplyForm && (
                    <div className="mt-3">
                        {/* Ensure authUser is checked before rendering ReplyForm */}
                        {authUser && <ReplyForm blogId={blogId} /> }
                    </div>
                )}

                {/* The commented-out reply rendering block should be uncommented and potentially adapted
                    if your Comment model supports nested replies (parent/child relationship).
                    The current setup only supports fetching top-level comments with pagination.
                */}
            </div>
        </div>
        </Suspense>
    );
};

export default Comment;
