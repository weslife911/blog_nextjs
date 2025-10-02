// src/store/useBlogStore.ts

import { axiosInstance } from "@/lib/axios";
import { Blog, BlogReturnType, BlogStore } from "@/types/blog"
import { create } from "zustand"

export const useBlogStore = create<BlogStore>((set) => ({
    blogs: null,
    blog: null,
    createBlog: async(data: Blog | FormData) => { // Accept FormData
            if (data instanceof FormData) {
                return (await axiosInstance.post<BlogReturnType>("/blogs", data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })).data;
            } else {
                return (await axiosInstance.post<BlogReturnType>("/blogs", data)).data;
            }
        },
    getBlogs: async(page?: string) => {
        const response = (await axiosInstance.get<BlogReturnType>(page ? `/blogs?page=${page}` : "/blogs")).data;
        return response;
    },
    getBlog: async(id: string) => {
        const response = (await axiosInstance.get<BlogReturnType>(`/blogs/${id}`)).data;
        set({ blog: response.success ? response.blog : null });
        return response;
    }
}))
