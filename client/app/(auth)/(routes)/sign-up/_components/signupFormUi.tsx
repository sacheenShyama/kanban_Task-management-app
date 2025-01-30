"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const SignupFormUi = () => {
  return (
    <form className="space-y-4 md:space-y-6">
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
          Name
        </label>
        <input
          type="name"
          name="name"
          id="name"
          className="bg-gray-50 border-2 outline-none border-gray-300 focus:border-blue-400 rounded w-full p-2"
          placeholder="name"
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
        Sign Up
      </Button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        I have an account{" "}
        <Link href="/sign-in" className="font-medium text-blue-600 underline ">
          Sign in
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

export default SignupFormUi;
