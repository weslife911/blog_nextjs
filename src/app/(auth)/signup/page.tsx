import { Metadata } from "next";
import SignupForm from "@/forms/SignupForm";

export const metadata: Metadata = {
  title: "Sign Up Page | Free Next.js Template for Startup and SaaS",
  description: "This is Sign Up Page for Startup Nextjs Template",
};

const SignupPage = async() => {

  return (
    <>
      <SignupForm/>
    </>
  );
};

export default SignupPage;
