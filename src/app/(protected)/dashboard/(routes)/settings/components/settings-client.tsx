"use client";

import axios from "axios";
import * as z from "zod";
import qs from "query-string";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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
import { useParams } from "next/navigation";
import { ImageUpload } from "@/components/image-upload";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Link name is required.",
  }),
  email: z.string().email().min(1, {
    message: "Url is required.",
  }),
  image: z.string().min(1, {
    message: "Url is required.",
  }),
});

export const SettingsClient = ({ user }: { user: any }) => {
  const router = useRouter();
  const params = useParams();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      image: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("name", user.name);
      form.setValue("email", user.email);
      form.setValue("image", user.image);
    }
  }, [form, user]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/user`,
      });
      await axios.patch(url, values);

      form.reset();
      toast.success("User details has been updated!");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6 px-6">
            <div className="flex items-center justify-start text-center">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUpload
                        endpoint="userImage"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold">
                    User Name
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold">
                    User Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="url"
                      className="w-full"
                      placeholder="Enter link url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="px-6 py-4">
            <Button disabled={isLoading} onClick={form.handleSubmit(onSubmit)}>
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
