"use client";

import axios from "axios";
import * as z from "zod";
import qs from "query-string";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useModal } from "@/hooks/use-modal";
import { useParams } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Link name is required.",
  }),
  url: z.string().url().min(1, {
    message: "Url is required.",
  }),
});

export const DeleteLinkModal = () => {
  const { type, isOpen, onClose, data } = useModal();

  const router = useRouter();
  const params = useParams();

  const { link } = data;

  const isModalOpen = isOpen && type === "deleteLink";

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const url = qs.stringifyUrl({
        url: `/api/links/${link?.id}`,
        query: {
          projectId: params?.projectId,
        },
      });

      await axios.delete(url);

      toast.success("Link has been deleted!");
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden max-w-[375px]">
        <DialogHeader className="pt-8 px-6 text-start">
          <DialogTitle className="text-xl font-bold">Delete Link</DialogTitle>
          <DialogDescription className="text-sm">
            Are you sure you want to do this?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="px-6 py-4">
          <Button
            className="bg-[#ED4245] hover:bg-[#ED4245]/90"
            disabled={isLoading}
            onClick={onClick}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
