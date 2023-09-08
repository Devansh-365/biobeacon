import AuthForm from "@/components/auth-form";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <div className="relative z-10 my-auto h-fit w-full max-w-sm overflow-hidden">
      <div className="flex flex-col items-center justify-center space-y-3 px-4 py-6 pt-8 text-center sm:px-16">
        <Icons.logo className="h-12 w-12 bg-white rounnde-xl" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
          Sign in to BioBeacon
        </h3>
        <p className="text-sm text-gray-500">
          An Open-Source Solution for Streamlining Your Social Media Links
        </p>
      </div>
      <div className="flex flex-col space-y-3 px-4 py-6 sm:px-16">
        <AuthForm />

        <p className="text-center text-sm text-gray-500">
          {`Don't have an account?`}{" "}
          <Link
            href="/register"
            className="font-semibold text-gray-500 transition-colors hover:text-black"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
