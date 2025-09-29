// src/store/useCommentStore.ts

import { axiosInstance } from "@/lib/axios"
import { Comment, CommentStore } from "@/types/blog"
import { create } from "zustand"

export const useCommentStore = create<CommentStore>((set) => ({
    comments: null,
    comment: null,
    createComment: async(data: Comment) => {
        return (await axiosInstance.post("/comments", data)).data;
    },
    getComments: async(blogId: string, page?: number) => {
        const response = (await axiosInstance.get(`/comments?blogId=${blogId}&page=${page || 1}`));
        if(response.data.success) {
            set({ comments: response.data.comments.docs.filter((comment: Comment) => comment.blog === blogId) });
        }
        return response.data;
    }
}))
