import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-black">
      <div className="flex items-center justify-center w-full bg-black rounded shadow  md:mt-0 sm:max-w-md xl:p-0">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
