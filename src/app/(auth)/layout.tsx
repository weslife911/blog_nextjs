"use client";

import GeneralLoader from "@/loader/GeneralLoader";
import { useGetAuthUser } from "@/services/queries";
import { ReactNode } from "react";

export default function AuthLayout({ children }: {
    children: ReactNode
}) {

    const checkAuth = useGetAuthUser();

    if(checkAuth.isPending) {
        return <GeneralLoader/>
    }

    return (
        <div>
            {children}
        </div>
    );
}
