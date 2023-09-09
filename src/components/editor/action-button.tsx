"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useModal } from "@/hooks/use-modal";

export default function ActionButton({
  text,
  link,
}: {
  text: string;
  link: any;
}) {
  const { onOpen } = useModal();
  console.log("ACTION", link)

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Campaign ID copied to clipboard.");
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(text)}>
            <Copy className="mr-2 h-4 w-4" /> Copy Name
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onOpen("updateLink", { link })}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onOpen("deleteLink", { link })}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
