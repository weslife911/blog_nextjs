import LoginModal from "@/modals/LoginModal";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"

export default function ReplyButton() {

    const [authToken, setAuthToken] = useState<string | null>(null);

        useEffect(() => {
            const tokenFromStorage = localStorage.getItem("startup_auth_token");
            setAuthToken(tokenFromStorage);
          }, []);

    return (
        <>
            {authToken ? <Button
                type="submit"
                className="mt-3 rounded-md bg-primary px-4 py-2 text-base font-medium text-white transition-all duration-300 hover:bg-primary/90"
            >
                Post Reply
            </Button> : <LoginModal>
                            <svg
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                    Post Reply
                </LoginModal>}
        </>
    );
}
