import Editor from "@/components/editor";
import Mobile from "@/components/preview/mobile";
import React from "react";

export default function ProjectIdPage({
  params,
}: {
  params: { projectId: string };
}) {
  return (
    <section className="flex h-full">
      <div className="h-full w-screen lg:w-auto lg:basis-3/5 pl-4 pr-4 border-r border-r-gray-200 overflow-scroll">
        <Editor projectId={params?.projectId} />
      </div>
      <div className="hidden lg:my-auto lg:flex-1 lg:basis-2/5 pl-4">
        <Mobile projectId={params?.projectId} />
      </div>
    </section>
  );
}
