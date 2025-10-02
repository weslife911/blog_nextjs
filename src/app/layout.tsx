"use client";

import { Inter } from "next/font/google";
import "../styles/index.css";
import { Toaster } from "@/components/ui/sonner"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import LoadingWrapper from "@/wrapper/LoadingWrapper";
// import { SessionProvider } from "next-auth/react"
import AuthProvider from '@/providers/AuthProvider'

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

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <LoadingWrapper>
                    {children}
                </LoadingWrapper>
            </AuthProvider>
        </QueryClientProvider>
        <Toaster />
    </body>
    </html>
  );
}
