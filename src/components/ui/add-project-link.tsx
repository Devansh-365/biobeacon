"use client";

import React from "react";
import { Button } from "./button";
import { Icons } from "../icons";
import { useModal } from "@/hooks/use-modal";

export default function AddProjectLink() {
  const { onOpen } = useModal();

  return (
    <Button className="w-full" onClick={() => onOpen("createProject")}>
      Add Link <Icons.add className="w-4 h-4 ml-2" />
    </Button>
  );
}
