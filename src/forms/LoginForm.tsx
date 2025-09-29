"use client"

import { useLoginUserMutation } from "@/services/mutations";
import Link from "next/link";
import { LoaderCircle, CircleAlert } from 'lucide-react';
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SocialButtons from "@/components/Auth/SocialButtons";
import GeneralLoader from "@/loader/GeneralLoader";

export default function LoginForm() {
    const loginUser = useLoginUserMutation();
    const router = useRouter();

    const { data: session, status } = useSession();

    const [authToken, setAuthToken] = useState<string | null>(null);

    useEffect(() => {
        const tokenFromStorage = localStorage.getItem("startup_auth_token");
        setAuthToken(tokenFromStorage);
    }, []);

    // if((status === "authenticated") || authToken) router.push("/");

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup
            .string()
            .email("Must be in email format")
            .required("Email is required"), // Made email required
            password: Yup
            .string()
            .min(8, "Password must be at least 8 characters long")
            .required("Password is required")
        }),
        onSubmit: async(values) => {
            loginUser.mutate(values, {
                onSuccess: (data) => {
                    if (data.success) {
                        router.refresh();
                        // router.push("/");
                    }
                }
            });
        }
    });

    // if (status === "loading") {
    //   return <GeneralLoader/>;
    // }

    return (
        <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Sign in to your account
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  Login to your account for a faster checkout.
                </p>
                {/* Social login buttons remain the same */}
                <SocialButtons/>
                <div className="mb-8 flex items-center justify-center">
                  <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
                  <p className="w-full px-5 text-center text-base font-medium text-body-color">
                    Or, sign in with your email
                  </p>
                  <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-8">
                    <Label
                      htmlFor="email"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Your Email
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter your Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur} // Added onBlur
                      className={`
                        border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300
                        ${
                        formik.touched.email && formik.errors.email
                            ? "border-red-500 focus:border-red-500"
                            : "focus:border-primary dark:focus:border-primary"
                        }
                        dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none
                    `}
                    />
                    {formik.touched.email && formik.errors.email ? (
                    <div className="mt-2 flex items-center text-red-500">
                        <CircleAlert className="h-4 w-4 mr-2" />
                        <span className="text-sm">{formik.errors.email}</span>
                    </div>
                    ) : null}
                  </div>
                  <div className="mb-8">
                    <Label
                      htmlFor="password"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Your Password
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Enter your Password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur} // Added onBlur
                      className={`
                        border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300
                        ${
                        formik.touched.password && formik.errors.password
                            ? "border-red-500 focus:border-red-500"
                            : "focus:border-primary dark:focus:border-primary"
                        }
                        dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none
                    `}
                    />
                    {formik.touched.password && formik.errors.password ? (
                    <div className="mt-2 flex items-center text-red-500">
                        <CircleAlert className="h-4 w-4 mr-2" />
                        <span className="text-sm">{formik.errors.password}</span>
                    </div>
                    ) : null}
                  </div>
                  <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
                    <div className="mb-4 sm:mb-0">
                      <Label
                        htmlFor="checkboxLabel"
                        className="flex cursor-pointer select-none items-center text-sm font-medium text-body-color"
                      >
                        <div className="relative">
                          <Input
                            type="checkbox"
                            id="checkboxLabel"
                            className="sr-only"
                          />
                          <div className="box mr-4 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
                            <span className="opacity-0">
                              <svg
                                width="11"
                                height="8"
                                viewBox="0 0 11 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                  fill="#3056D3"
                                  stroke="#3056D3"
                                  strokeWidth="0.4"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                        Keep me signed in
                      </Label>
                    </div>
                    <div>
                      <a
                        href="#0"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Forgot Password?
                      </a>
                    </div>
                  </div>
                  <div className="mb-6">
                    <Button type="submit" className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90" disabled={loginUser.isPending}>
                      {loginUser.isPending ? <>
                        <span className="flex items-center space-x-2">
                            <LoaderCircle className="h-5 w-5 animate-spin" />
                        </span>
                      </> : "Login"}
                    </Button>
                  </div>
                </form>
                <p className="text-center text-base font-medium text-body-color">
                  Don’t you have an account?{" "}
                  <Link href="/signup" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    );
}
