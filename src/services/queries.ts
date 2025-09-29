"use client"

import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "@/store/useAuthStore"
import { useBlogStore } from "@/store/useBlogStore";
import { useCommentStore } from "@/store/useCommentStore";

export const useGetAuthUser = () => {

    const { checkAuth } = useAuthStore();

    return useQuery({
        queryKey: ["users"],
        queryFn: () => checkAuth(),
        refetchOnWindowFocus: false,
    });
};

export const useGetBlogs = (page?: string) => {
    const { getBlogs } = useBlogStore();

    return useQuery({
        queryKey: ["blogs", page],
        queryFn: () => getBlogs(page)
    });
};

export const useGetBlog = (id: string) => {
    const { getBlog } = useBlogStore();

    return useQuery({
        queryKey: ["blog", id],
        queryFn: () => getBlog(id),
        enabled: !!id,
    });
}

export const useGetComments = (blogId: string, page: number) => {
    const { getComments } = useCommentStore();

    return useQuery({
        queryKey: ["comments", blogId, page],
        queryFn: () => getComments(blogId, page),
        enabled: !!blogId,
    });
};
