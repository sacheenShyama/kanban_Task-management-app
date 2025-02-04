"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/progressBar";
import { handleLogin } from "@/lib/features/authSlice/slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
const SignInFormUi = () => {
  const dispatch = useAppDispatch();
  const { loading, error, user } = useAppSelector((state) => state.auth);

  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [router, user]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(handleLogin(formData));
    setFormData({ email: "", password: "" });
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
            onChange={handleChange}
            id="email"
            className="w-full p-2 text-white outline-none border-none rounded-[4] bg-neutral-700"
            placeholder="name@company.com"
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
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 text-white outline-none border-none rounded-[4] bg-neutral-700"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="rounded p-2 w-full text-white bg-blue-500 hover:bg-blue-600"
        >
          Sign In
        </Button>
        {error && <p className="text-red-600">{error}</p>}

        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don’t have an account yet?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-blue-600 underline "
          >
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
    </>
  );
};

export default SignInFormUi;
