"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Drawer } from "vaul";
import { DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

type Props = {};

export default function DrawerClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 p-4 z-10 flex justify-center items-center backdrop-blur-sm ">
      <Drawer.Root>
        <DrawerTrigger asChild>
          <Button className="rounded-full max-w-[350px] w-full tracking-wide overflow-y-auto">
            Preview page
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[75%] px-2 pt-10 pb-2">
          {children}
        </DrawerContent>
      </Drawer.Root>
    </div>
  );
}
