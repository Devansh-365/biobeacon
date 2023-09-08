"use client";

import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { useRouter, useSearchParams } from "next/navigation";

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const AuthForm = ({ className, ...props }: AuthFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google", {
        redirect: false,
        callbackUrl: searchParams?.get("from") || "/",
      });
      router.push(`/`);
    } catch (error) {
      console.log("GOOGLE AUTH ERROR: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button type="button" onClick={loginWithGoogle} disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="animate-spin mr-2" />
        ) : (
          <Icons.google className="mr-2" />
        )}
        Continue with Google
      </Button>
    </div>
  );
};

export default AuthForm;
