"use client";

import axios from "axios";
import * as z from "zod";
import qs from "query-string";
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
import { useParams } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Link name is required.",
  }),
  url: z.string().url().min(1, {
    message: "Url is required.",
  }),
});

export const UpdateLinkModal = () => {
  const { type, isOpen, onClose, data } = useModal();

  const router = useRouter();
  const params = useParams();

  const { link } = data;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      url: "",
    },
  });

  useEffect(() => {
    if (link) {
      form.setValue("name", link.name);
      form.setValue("url", link.url);
    }
  }, [form, link]);

  const isModalOpen = isOpen && type === "updateLink";

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("MODAL: ", values);
      const url = qs.stringifyUrl({
        url: `/api/links/${link?.id}`,
        query: {
          projectId: params?.projectId,
        },
      });
      await axios.patch(url, values);
      form.reset();
      toast.success("Link has been created!");
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
          <DialogTitle className="text-xl font-bold text-start">
            Update Link
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
                    <FormLabel className="text-xs font-semibold">
                      Enter Link Name
                    </FormLabel>
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
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold">
                      Enter Link URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        type="url"
                        className="w-full"
                        placeholder="Enter link url"
                        defaultValue={link?.url}
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
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
