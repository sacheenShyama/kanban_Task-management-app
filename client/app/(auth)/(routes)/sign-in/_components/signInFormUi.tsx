import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { redirect } from "next/navigation";
const SignInFormUi = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    redirect("dashboard");
  };
  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="bg-gray-50 border-2 outline-none border-gray-300 focus:border-blue-400 rounded w-full p-2"
          placeholder="name@company.com"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border-2 outline-none border-gray-300 focus:border-blue-400 rounded w-full p-2"
        />
      </div>
      <Button
        type="submit"
        className="rounded p-2 w-full text-white bg-blue-500 hover:bg-blue-600"
      >
        Sign In
      </Button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet?{" "}
        <Link href="/sign-up" className="font-medium text-blue-600 underline ">
          Sign up
        </Link>
      </p>
      {/* <div className="w-full ">
      <p className="text-gray-500">Or continue with</p>
      <button className="w-1/2 rounded shadow bg-slate-200 p-1 text-white">
        Google
      </button>
    </div> */}
    </form>
  );
};

export default SignInFormUi;
