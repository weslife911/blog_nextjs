"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import MDEditor from "@uiw/react-md-editor";
import { useFormik } from "formik"
import * as Yup from "yup"
import { useCreateBlogMutation } from "@/services/mutations";
import { LoaderCircle } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { BlogReturnType } from "@/types/blog";
import { useRouter } from "next/navigation"
import { useState } from "react";

export default function BlogForm() {

    const createBlogMutation = useCreateBlogMutation();

    const { authUser } = useAuthStore();

    const router = useRouter();

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    function stringToArray(input: string): string[] {
        if (input.trim() === '') {
            return [];
        }

        return input.split(',').map(item => item.trim());
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
    };

    const formik = useFormik({
        initialValues: {
            blogTitle: "",
            blogContent: "",
            blogTags: ""
        },
        validationSchema: Yup.object({
            blogTitle: Yup.string().required("Blog Title is required"),
            blogContent: Yup.string().required("Blog Content is required"),
            blogTags: Yup.string().optional()
        }),
        onSubmit: async(values) => {
        setIsUploadingImage(true); // Show loading state

        const blogTagsArray = stringToArray(values.blogTags);

        // 1. Check if a file is selected
        if (selectedFile) {
            // 2. Create FormData and append all fields
            const formData = new FormData();
            formData.append('blogTitle', values.blogTitle);
            formData.append('blogContent', values.blogContent);
            formData.append('blogAuthorID', authUser?._id || '');
            // Append the file using the key 'file' to match route.ts
            formData.append('file', selectedFile);
            // Join the tags array back into a string for the backend to parse
            formData.append('blogTags', blogTagsArray.join(','));

            // 3. Instead of the original mutation payload, mutate with the FormData object
            // The type signature of useCreateBlogMutation.mutate will need to be flexible enough
            await createBlogMutation.mutate(formData as any, { // Use formData as the payload
                onSuccess: (data: BlogReturnType) => {
                    setIsUploadingImage(false);
                    if(data.success) {
                        router.refresh();
                        router.push("/blogs")
                    }
                },
                onError: () => { // Crucial to handle state on error too
                    setIsUploadingImage(false);
                }
            });

        } else {
            // 4. If no file, send the original JSON payload structure
            await createBlogMutation.mutate({
                blogTitle: values.blogTitle,
                blogContent: values.blogContent,
                blogImage: null, // Send null since there's no file
                blogAuthorID: authUser?._id,
                blogTags: blogTagsArray
            }, {
                onSuccess: (data: BlogReturnType) => {
                    setIsUploadingImage(false);
                    if(data.success) {
                        router.refresh();
                        router.push("/blogs")
                    }
                },
                onError: () => {
                    setIsUploadingImage(false);
                }
            });
        }
    }
}
);

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-8 xl:py-8 2xl:p-8 space-y-6"
        >
            {/* Blog Title Input */}
            <div>
                <Label
                    htmlFor="blog-title"
                    className="mb-3 block text-base font-bold text-black dark:text-white"
                >
                    Blog Title
                </Label>
                <Input
                    type="text"
                    id="blogTitle"
                    name="blogTitle"
                    value={formik.values.blogTitle}
                    onChange={formik.handleChange}
                    placeholder="Enter the title here..."
                    className="w-full text-xl sm:text-2xl font-medium rounded-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-800 py-3 px-4 text-black dark:text-white outline-none focus:border-primary focus:shadow-md transition duration-300"
                />
                {formik.touched.blogTitle && formik.errors.blogTitle && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.blogTitle}</p>
                )}
            </div>

            {/* Blog Content MDEditor */}
            <div className="border-b border-body-color border-opacity-10 pb-6 dark:border-white dark:border-opacity-10">
                <Label
                    htmlFor="blog-content"
                    className="mb-3 block text-base font-bold text-black dark:text-white"
                >
                    Blog Content
                </Label>
                <MDEditor
                    id="blog-content"
                    className="
                        w-full resize-none rounded-sm border
                        border-gray-300 dark:border-gray-600
                        py-3 px-4 text-base font-medium
                        outline-none focus:border-primary focus:shadow-md transition duration-300
                    "
                    value={formik.values.blogContent}
                    onChange={(val) => formik.setFieldValue('blogContent', val || '')}
                    textareaProps={{
                        placeholder: "Write your blog content here...",
                        name: "blogContent"
                    }}
                    previewOptions={{
                        disallowedElements: ["style"],
                    }}
                />
                {formik.touched.blogContent && formik.errors.blogContent && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.blogContent}</p>
                )}
            </div>

            {/* Featured Image Upload */}
            <div className="pt-2">
                <Label
                    htmlFor="blog-image"
                    className="mb-3 block text-base font-bold text-black dark:text-white"
                >
                    Featured Image
                </Label>
                <Input
                    type="file"
                    id="blog-image"
                    name="blogImage"
                    accept="image/*" // Only allow image files
                    onChange={handleFileChange}
                    className="w-full rounded-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-800 py-3 px-4 text-base text-black dark:text-white outline-none focus:border-primary focus:shadow-md transition duration-300"
                />
                {selectedFile && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Selected: {selectedFile.name}
                    </p>
                )}
                {isUploadingImage && (
                    <p className="mt-2 text-sm text-blue-600 flex items-center">
                        <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                        Uploading image...
                    </p>
                )}
            </div>

            {/* Tags Input */}
            <div className="pt-4">
                <div>
                    <Label
                        htmlFor="blogTags"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                        Tags (comma-separated, first tag is featured)
                    </Label>
                    <Input
                        type="text"
                        id="blog-tags"
                        name="blogTags"
                        value={formik.values.blogTags}
                        onChange={formik.handleChange}
                        placeholder="e.g., creative, design, coding"
                        className="w-full text-xl sm:text-2xl font-medium rounded-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-800 py-3 px-4 text-black dark:text-white outline-none focus:border-primary focus:shadow-md transition duration-300"
                    />
                </div>
            </div>

            <div className="pt-8">
                <Button
                    type="submit"
                    className="w-full inline-flex items-center justify-center rounded-sm px-6 py-3 text-base font-semibold text-white bg-primary duration-300 hover:bg-opacity-90 shadow-md"
                    disabled={createBlogMutation.isPending}
                >
                    {createBlogMutation.isPending ?
                        <span className="flex items-center space-x-2">
                            <LoaderCircle className="h-5 w-5 animate-spin" />
                        </span>
                        : "Publish Blog Post"
                    }
                </Button>
            </div>
        </form>
    );
}
