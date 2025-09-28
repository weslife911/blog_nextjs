"use client"

import { useLoginUserMutation } from "@/services/mutations";
import Link from "next/link";
import { LoaderCircle, CircleAlert } from 'lucide-react';
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/navigation"

// shadcn/ui components
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function LoginModalForm() {

    const loginUser = useLoginUserMutation();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        // IMPORTANT: Retain existing validation logic
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email("Must be in email format")
                .required("Email is required"),
            password: Yup
                .string()
                .min(8, "Password must be at least 8 characters long")
                .required("Password is required")
        }),
        // IMPORTANT: Retain existing mutation/submission logic
        onSubmit: async(values) => {
            loginUser.mutate(values, {
                onSuccess: (data) => {
                    if (data.success) {
                        router.refresh();
                        // Modal closure should be handled by the parent LoginModal component
                        // by changing its 'open' state, which is outside this form's scope.
                    }
                }
            });
        }
    });

    return (
        // The form content is now pure and uses tight spacing for the modal view.
        <form onSubmit={formik.handleSubmit} className="space-y-5 pt-4 bg-black">

            {/* Error Message: Clean, visible alert if login fails */}
            {loginUser.isError && (
                <div className="flex items-center space-x-2 text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-300 dark:bg-red-950/20 dark:border-red-900">
                    <CircleAlert className="h-4 w-4 flex-shrink-0" />
                    <span className="font-medium">Failed to log in. Please check your credentials.</span>
                </div>
            )}

            {/* Email Field Group */}
            <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email ? (
                    <p className="text-xs text-red-500 mt-1">{formik.errors.email}</p>
                ) : null}
            </div>

            {/* Password Field Group */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                        href="/forgot-password"
                        className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                        Forgot password?
                    </Link>
                </div>
                <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
                {formik.touched.password && formik.errors.password ? (
                    <p className="text-xs text-red-500 mt-1">{formik.errors.password}</p>
                ) : null}
            </div>

            {/* Submit Button */}
            <div className="pt-3">
                <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 transition-all"
                    disabled={loginUser.isPending || !formik.isValid}
                >
                    {loginUser.isPending ? (
                        <span className="flex items-center space-x-2">
                            <LoaderCircle className="h-5 w-5 animate-spin" />
                        </span>
                    ) : (
                        'Login'
                    )}
                </Button>
            </div>

            {/* Signup Link */}
            <div className="mt-6 text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link
                    href="/signup"
                    className="font-semibold text-primary hover:text-primary/80"
                >
                    Sign up
                </Link>
            </div>
        </form>
    );
}
