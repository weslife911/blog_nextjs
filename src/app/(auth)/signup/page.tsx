import { Metadata } from "next";
import SignupForm from "@/components/Auth/SignupForm";

export const metadata: Metadata = {
  title: "Sign Up Page | Free Next.js Template for Startup and SaaS",
  description: "This is Sign Up Page for Startup Nextjs Template",
};

const SignupPage = () => {

  return (
    <>
      <SignupForm/>
    </>
  );
};

export default SignupPage;
