import { Providers } from "@/app/providers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import GeneralLoader from "@/loader/GeneralLoader";
import { useGetAuthUser } from "@/services/queries";
import { ReactNode } from "react";

export default function LoadingWrapper({
    children,
}: {
    children: ReactNode;
}) {

    const checkAuth = useGetAuthUser();

    if(checkAuth.isPending) {
        return <GeneralLoader/>
    }

    return (
        <Providers>
            <Header />
            {children}
            <Footer />
            <ScrollToTop />
        </Providers>
    );
}
