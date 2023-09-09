import Link from "next/link";

import { buttonVariants } from "./ui/button";
import { Icons } from "./icons";
import { getCurrentUser } from "@/lib/session";
import React from "react";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <header className="fixed top-0 left-0 z-10 w-full border-b border-[rgba(255, 255, 255, 0.08)] backdrop-blur-[12px]">
      <div className="max-w-[120rem] px-8 text-center h-12 flex">
        <Link className="flex items-center text-md" href="/">
          <Icons.logo className="mr-2 h-5 w-5" /> BioBeacon
        </Link>
        <div className="ml-auto flex h-full items-center">
          {!user ? (
            <React.Fragment>
              <Link
                className={buttonVariants({
                  size: "sm",
                  className: "rounded-full mr-2 lg:mr-4",
                  variant: "ghost",
                })}
                href="/login"
              >
                Log in
              </Link>
              <Link
                className={buttonVariants({
                  size: "sm",
                  className: "rounded-full",
                })}
                href="/register"
              >
                Sign up
              </Link>
            </React.Fragment>
          ) : (
            <Link
              className={buttonVariants({
                size: "sm",
                className: "rounded-full",
              })}
              href="/dashboard"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
