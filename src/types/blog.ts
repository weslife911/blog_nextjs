import Blog from "@/components/Blog";

export type Blog = {
  _id?: string,
  blogTitle: string;
  blogContent: string;
  blogImage?: File | null,
  blogAuthorID: string,
  blogTags?: string[],
  createdAt?: string,
  updatedAt?: string
};

export type BlogReturnType = {
    success: boolean,
    blogs?: Blog[],
    blog?: Blog,
    message?: string
}

export interface BlogStore {
    blogs: Blog[] | null,
    blog: Blog | null,
    createBlog: (data: Blog) => Promise<BlogReturnType>,
    getBlogs: (page?: string) => Promise<BlogReturnType>,
    getBlog: (id: string) => Promise<BlogReturnType>
};
