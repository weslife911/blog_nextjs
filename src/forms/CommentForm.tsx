"use client"

import CommentButton from "@/components/Comment/CommentButton";
import MDEditor, { comment } from "@uiw/react-md-editor";
import { useCreateCommentMutation } from "@/services/mutations";
import { useFormik } from "formik"
import * as Yup from "yup"
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { CommentReturnType } from "@/types/blog";
import { CircleAlert } from "lucide-react";

const CommentForm = ({ blogId }: {
    blogId: string
}) => {

    const createComment = useCreateCommentMutation();
    const { authUser } = useAuthStore();

    const router = useRouter();


    const formik = useFormik({
        initialValues: {
            user: authUser._id,
            blog: blogId,
            comment: ""
        },
        validationSchema: Yup.object({
            user: Yup.string().required("User ID is required"),
            blog: Yup.string().required("Blog ID is required"),
            comment: Yup.string().required("Comment ID is required")
        }),
        onSubmit: async(values) => {
            await createComment.mutate(values, {
                onSuccess: (data: CommentReturnType) => {
                    if(data.success) {
                        router.refresh();
                    }
                }
            });
        }
    });

    return (
        <form className="mt-4" onSubmit={formik.handleSubmit}>
            <MDEditor
                textareaProps={{
                    placeholder: "Write your comment...",
                    name: "comment"
                }}
                value={formik.values.comment}
                    onChange={(val) => formik.setFieldValue('comment', val || '')}
                className="w-full resize-none rounded-md border border-stroke bg-[#f8f8f8] px-5 py-3 text-base text-body-color outline-none transition-all focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:focus:border-primary"
            />
            {formik.touched.comment && formik.errors.comment ? (
                    <div className="mt-2 flex items-center text-red-500">
                        <CircleAlert className="h-4 w-4 mr-2" />
                        <span className="text-sm">{formik.errors.comment}</span>
                    </div>
                    ) : null}
            <CommentButton isPending={createComment.isPending} />
        </form>
    );
};

export default CommentForm
