"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import ProgressBar from "@/components/progressBar";
import { handleLogin } from "@/lib/features/authSlice/slice";
const SignInFormUi = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );

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
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
            className="bg-gray-50 border-2 outline-none border-gray-300 focus:border-blue-400 rounded w-full p-2"
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
