"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  name: String;
  href: any;
}

export default function SettingsLayout({
  children,
  tabs,
}: {
  children: ReactNode;
  tabs: NavItemProps[];
}) {
  const router = usePathname();

  return (
    <div className="bg-white min-h-screen">
      <div className="flex h-36 items-center border-b border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Settings</h1>
          </div>
        </div>
      </div>
      <div className="grid mx-auto w-full max-w-screen-xl px-2.5 lg:px-20 items-start gap-5 py-10 md:grid-cols-5">
        <div className="sticky top-36 flex gap-1 md:grid">
          {tabs.map(({ name, href }) => (
            <Link
              href={href}
              key={href}
              className={cn(
                "rounded-md p-2.5 text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200",
                {
                  "font-semibold text-black bg-gray-200": router === href,
                }
              )}
            >
              {name}
            </Link>
          ))}
        </div>
        <div className="grid gap-5 md:col-span-4">{children}</div>
      </div>
    </div>
  );
}
