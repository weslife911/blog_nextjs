"use client"

import ReplyButton from "@/components/Comment/ReplyButton";
import MDEditor from "@uiw/react-md-editor";

const ReplyForm = ({ blogId }: {
    blogId: string
}) => {

    return (
        <form className="mt-4">
            <MDEditor
                textareaProps={{
                    placeholder: "Write your reply...",
                    name: "reply"
                }}
                className="w-full resize-none rounded-md border border-stroke bg-[#f8f8f8] px-5 py-3 text-base text-body-color outline-none transition-all focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:focus:border-primary"
            />
            <ReplyButton />
        </form>
    );
};

export default ReplyForm
