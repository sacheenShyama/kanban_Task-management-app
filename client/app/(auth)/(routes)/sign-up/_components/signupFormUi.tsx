"use client";
import { Button } from "@/components/ui/button";
import { handleSignup } from "@/lib/features/authSlice/slice";
import { AppDispatch, RootState } from "@/lib/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProgressBar from "@/components/progressBar";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
const SignupFormUi = () => {
  const dispatch = useAppDispatch<AppDispatch>();
  const { loading, error, user } = useAppSelector(
    (state: RootState) => state.auth
  );

  const router = useRouter();
  useEffect(() => {
    console.log(user);
    if (user) {
      router.push("/dashboard");
    }
  }, [router, user]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(handleSignup(formData));
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <>
      {loading && <ProgressBar />}
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2 text-sm font-medium text-white">
            Your email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            id="email"
            onChange={handleChange}
            className="w-full p-2 text-white outline-none border-none rounded-[4] bg-neutral-700"
            placeholder="name@company.com"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-white">
            Name
          </label>
          <input
            type="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            id="name"
            className="w-full p-2 text-white outline-none border-none rounded-[4] bg-neutral-700"
            placeholder="name"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-white">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full p-2 text-white outline-none border-none rounded-[4] bg-neutral-700"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="rounded p-2 w-full text-white bg-blue-500 hover:bg-blue-600"
        >
          Sign up
        </Button>
        {error && <p className="text-red-600">{error}</p>}
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          I have an account{" "}
          <Link
            href="/sign-in"
            className="font-medium text-blue-600 underline "
          >
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
    </>
  );
};

export default SignupFormUi;
