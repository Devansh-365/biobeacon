"use client";

import React from "react";
import { Button } from "./button";
import { useModal } from "@/hooks/use-modal";

export default function ShareLinkButton({ project }: { project: any }) {
  const { onOpen } = useModal();

  return (
    <Button
      className="w-full"
      size="sm"
      onClick={() => onOpen("shareLink", { project })}
    >
      Share your Link ✨
    </Button>
  );
}
