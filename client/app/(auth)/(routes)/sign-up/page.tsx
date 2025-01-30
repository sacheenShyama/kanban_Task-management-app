import React from "react";
import SignupFormUi from "./_components/signupFormUi";
const SignUp = () => {
  return (
    <div className="w-full bg-white rounded shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-4 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
          Create an account
        </h1>
        <SignupFormUi />
      </div>
    </div>
  );
};

export default SignUp;
