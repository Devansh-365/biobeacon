import Editor from "@/components/editor";
import React from "react";

export default function ProjectIdPage({
  params,
}: {
  params: { projectId: string };
}) {
  return (
    <section className="flex h-full">
      <div className="h-full lg:basis-3/5 pl-4 pr-4 border-r border-r-gray-200 overflow-scroll">
        <Editor projectId={params?.projectId} />
      </div>
      <div className="flex-1"></div>
    </section>
  );
}
