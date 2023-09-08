"use client";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useModal } from "@/hooks/use-modal";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Project name is required.",
  }),
});

export const CreateProjectModal = () => {
  const { type, isOpen, onClose } = useModal();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const isModalOpen = isOpen && type === "createProject";

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("MODAL: ", values);
      await axios.post("/api/projects", values);

      form.reset();
      toast.success("Project has been created!");
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="p-0 overflow-hidden max-w-[375px]">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-xl font-bold">
            Create Project
          </DialogTitle>
          {/* <DialogDescription className="text-gray-400 text-sm">
            Give your server a personality with a name and an image. You can
            always change it later.
          </DialogDescription> */}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="w-full"
                        placeholder="Enter link name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="px-6 py-4">
              <Button
                disabled={isLoading}
                onClick={form.handleSubmit(onSubmit)}
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
