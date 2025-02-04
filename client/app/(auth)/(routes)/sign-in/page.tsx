import React from "react";
import SignInFormUi from "./_components/signInFormUi";

const SignIn = () => {
  return (
    <div className="w-full bg-neutral-900 rounded-[8] shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
      <div className="p-4 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold text-white md:text-2xl">
          Log In
        </h1>
        <SignInFormUi />
      </div>
    </div>
  );
};

export default SignIn;
