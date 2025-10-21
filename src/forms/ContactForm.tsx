"use client"

import { UseSendEmailMutation } from "@/services/mutations";
import { sendEmailReturnType } from "@/types/email";
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/navigation"
import { CircleAlert, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";

export default function ContactForm() {

  const sendEmailMutation = UseSendEmailMutation();
  const router = useRouter();

  const { authUser } = useAuthStore();

  const formik = useFormik({
    initialValues: {
      full_name: authUser ? authUser.full_name: "",
      email: authUser ? authUser.email: "",
      message: ""
    },
    validationSchema: Yup.object({
      full_name: Yup.string().required("Full name is required"),
      email: Yup.string().email("Please enter a valid email").required("Email is required"),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: async(values) => {
      sendEmailMutation.mutate(values, {
        onSuccess: (data: sendEmailReturnType) => {
          if(data.success) {
            router.push("/");
          }
        }
      })
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="-mx-4 flex flex-wrap">
        <div className="w-full px-4 md:w-1/2">
          <div className="mb-8">
            <label
              htmlFor="name"
              className="mb-3 block text-sm font-medium text-dark dark:text-white"
            >
              Your Name
            </label>
            <input
              value={formik.values.full_name}
              onChange={formik.handleChange}
              type="text"
              placeholder="Enter your name"
              name="full_name"
              className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
            />
          </div>
          {formik.touched.full_name && formik.errors.full_name ? (
            <div className="mt-2 flex items-center text-red-500">
                <CircleAlert className="h-4 w-4 mr-2" />
                <span className="text-sm">{formik.errors.full_name}</span>
            </div>
          ) : null}
        </div>
        <div className="w-full px-4 md:w-1/2">
          <div className="mb-8">
            <label
              htmlFor="email"
              className="mb-3 block text-sm font-medium text-dark dark:text-white"
            >
              Your Email
            </label>
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              type="email"
              placeholder="Enter your email"
              name="email"
              className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className="mt-2 flex items-center text-red-500">
                <CircleAlert className="h-4 w-4 mr-2" />
                <span className="text-sm">{formik.errors.email}</span>
            </div>
          ) : null}
        </div>
        <div className="w-full px-4">
          <div className="mb-8">
            <label
              htmlFor="message"
              className="mb-3 block text-sm font-medium text-dark dark:text-white"
            >
              Your Message
            </label>
            <textarea
              value={formik.values.message}
              onChange={formik.handleChange}
              name="message"
              rows={5}
              placeholder="Enter your Message"
              className="border-stroke dark:text-body-color-dark dark:shadow-two w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
            ></textarea>
          </div>
          {formik.touched.message && formik.errors.message ? (
            <div className="mt-2 flex items-center text-red-500">
                <CircleAlert className="h-4 w-4 mr-2" />
                <span className="text-sm">{formik.errors.message}</span>
            </div>
          ) : null}
        </div>
        <div className="w-full px-4">
          <Button type="submit" className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90" disabled={sendEmailMutation.isPending}>
            {sendEmailMutation.isPending ? <>
              <span className="flex items-center space-x-2">
                  <LoaderCircle className="h-5 w-5 animate-spin" />
              </span>
            </> : "Contact"}
          </Button>
        </div>
      </div>
    </form>
  );
}