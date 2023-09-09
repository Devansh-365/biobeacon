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
  bio: z.string().min(1, {
    message: "Url is required.",
  }),
  image: z.string().min(1, {
    message: "Image is required.",
  }),
});

export const SettingsClient = ({ project }: { project: any }) => {
  const router = useRouter();
  const params = useParams();

  console.log("PROJECT", project)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bio: "",
      image: project.image,
    },
  });

  useEffect(() => {
    if (project) {
      form.setValue("name", project.name);
      form.setValue("bio", project.bio);
      form.setValue("image", project.image);
    }
  }, [form, project]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/projects/${params?.projectId}`,
      });
      await axios.patch(url, values);

      form.reset();
      toast.success("Link has been created!");
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
                        endpoint="projectImage"
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
                    Project Name
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
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold">
                    Project Bio
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
