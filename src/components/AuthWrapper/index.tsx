"use client";

import { useAuthContext } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthWrapperProps {
  children: React.ReactNode;
  isPrivate?: boolean;
}

export const AuthWrapper = ({
  children,
  isPrivate = true,
}: AuthWrapperProps) => {
  const { user, loadingPage } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (isPrivate && !user && !loadingPage) {
      router.push("/");
    }
  }, [user, loadingPage]);

  if (loadingPage) {
    return <p>Loading...</p>;
  }



  return children;
};
