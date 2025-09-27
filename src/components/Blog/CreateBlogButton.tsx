"use client"

import LoginModal from "@/modals/LoginModal";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";

export default function CreateBlogButton() {

    const [authToken, setAuthToken] = useState<string | null>(null);

    useEffect(() => {
        const tokenFromStorage = localStorage.getItem("startup_auth_token");
        setAuthToken(tokenFromStorage);
      }, []);

    return (
        <div className="w-full px-4 mb-12">
                <div className="text-center">
                    {authToken ? <Button asChild>
                        <Link
                        href="/blogs/create"
                        className="inline-flex items-center justify-center rounded-sm px-8 py-3 text-base font-semibold text-white bg-primary duration-300 hover:bg-opacity-90 shadow-md transition-all"
                    >
                        <svg
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Create New Blog Post
                    </Link>
                    </Button> : <LoginModal>
                            <svg
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Create New Blog Post
                        </LoginModal>}
                </div>
            </div>
    );
}
