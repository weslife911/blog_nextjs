

export type Blog = {
  _id?: string,
  blogTitle: string;
  blogContent: string;
  blogImage?: File | null,
  blogAuthorID: string,
  blogCategory: string,
  blogTags?: string[],
  createdAt?: string,
  updatedAt?: string
};

export interface PaginatedBlogs {
    docs: Blog[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}

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

export interface Reply {
    id: string;
    userName: string;
    userAvatar: string;
    date: string; // e.g., "1 hour ago"
    text: string;
}

export interface Comment {
    _id?: string,
    user: string,
    blog: string,
    comment: string
}

export interface CommentReturnType {
    success: boolean,
    comments?: Comment[],
    comment?: Comment,
    message?: string
}

export interface CommentStore {
    comments: Comment[] | null,
    comment: Comment | null,
    createComment: (data: Comment) => Promise<CommentReturnType>,
    getComments: (blogId: string, page?: number) => Promise<CommentReturnType>
}

export interface PaginatedComments {
    docs: Comment[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}
