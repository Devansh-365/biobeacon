import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function DashboardPage() {
  return (
    <>
      <section className="flex h-36 items-center border-b border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">My Projects</h1>
            <Button>
              Create Projects <Icons.add className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
        <div className="my-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          <Link
            href="#"
            className="flex flex-col space-y-10 rounded-lg border border-gray-100 bg-white p-6 shadow transition-all hover:shadow-lg"
          >
            df
          </Link>
        </div>
      </section>
    </>
  );
}
