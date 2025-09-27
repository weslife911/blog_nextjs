"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "../styles/index.css";
import { Toaster } from "@/components/ui/sonner"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Providers } from "./providers";
import GeneralLoader from "@/loader/GeneralLoader";
import { useGetAuthUser } from "@/services/queries";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 5,
            retryDelay: 1000
        }
    }
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    // const checkAuth = useGetAuthUser();

    // if(checkAuth.isPending) {
    //     return <GeneralLoader/>
    // }

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <QueryClientProvider client={queryClient}>
            <Providers>
                <Header />
                {children}
                <Footer />
                <ScrollToTop />
            </Providers>
        </QueryClientProvider>
        <Toaster />
    </body>
    </html>
  );
}
