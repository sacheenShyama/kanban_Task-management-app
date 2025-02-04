"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/sign-in");
  }, [router]);
  return (
    <div>
      <p>go to login page</p>
    </div>
  );
}
