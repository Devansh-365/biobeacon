"use client";

import React from "react";
import { Button } from "./button";
import { Icons } from "../icons";
import { useModal } from "@/hooks/use-modal";

export default function CreateProjectButton() {
  const { onOpen } = useModal();

  return (
    <Button onClick={() => onOpen("createProject")}>
      Create Project <Icons.add className="w-4 h-4 ml-2" />
    </Button>
  );
}
