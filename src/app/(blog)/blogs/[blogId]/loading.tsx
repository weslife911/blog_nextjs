import { LoaderCircle } from "lucide-react";

export default function Loading() {
    return (
        <section className="flex items-center justify-center min-h-[50vh] py-10">
            <div className="flex flex-col items-center space-y-4">
                {/* Killer Loader Animation */}
                <div className="relative">
                    {/* Outer pulse effect */}
                    <div className="absolute inset-0 bg-primary opacity-25 rounded-full animate-ping-slow"></div>

                    {/* Inner spinning loader */}
                    <LoaderCircle
                        className="h-16 w-16 text-primary animate-spin"
                    />
                </div>

                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 pt-4">
                    Fetching blog post...
                </p>
            </div>
        </section>
    );
}
