import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-full  bg-gray-100 dark:bg-gray-900">{children}</div>;
};
export default layout;
