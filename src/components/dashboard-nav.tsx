"use client";

import React, { useState } from "react";
import { Icons } from "./icons";
import Link from "next/link";
import ProjectSwitcher from "./project-switcher";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  {
    path: "/dashboard",
    name: "Projects",
  },
  {
    path: "/settings",
    name: "Settings",
  },
];

export default function DashboardNav() {
  let pathname = usePathname() || "/";

  if (pathname.includes("/writing/")) {
    pathname = "/writing";
  }

  const [hoveredPath, setHoveredPath] = useState(pathname);

  return (
    <header className="sticky left-0 right-0 top-0 z-20 border-b bg-white border-gray-200 ">
      <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
        <div className="flex h-16 items-center justify-between">
          <div className="flex space-x-4">
            <Link href="/">
              <Icons.logo className="w-8 h-8" />
            </Link>
            <ProjectSwitcher />
          </div>
        </div>
        <nav className="-mb-0.5 flex h-12 items-center justify-start space-x-2 overflow-x-auto scrollbar-hide">
          {navItems.map((item, index) => {
            const isActive = item.path === pathname;

            return (
              <Link
                key={item.path}
                className={`px-4 py-2 rounded-md text-xs lg:text-sm relative no-underline duration-300 ease-in ${
                  isActive ? "text-black font-medium" : "text-black/50"
                }`}
                data-active={isActive}
                href={item.path}
                onMouseOver={() => setHoveredPath(item.path)}
                onMouseLeave={() => setHoveredPath(pathname)}
              >
                <span>{item.name}</span>
                {item.path === hoveredPath && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-full bg-gray-200 rounded-md -z-10"
                    layoutId="navbar"
                    aria-hidden="true"
                    style={{
                      width: "100%",
                    }}
                    transition={{
                      type: "spring",
                      bounce: 0.25,
                      stiffness: 130,
                      damping: 9,
                      duration: 0.3,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
