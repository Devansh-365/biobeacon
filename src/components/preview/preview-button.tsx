import React from "react";
import DisplayData from "./display-data";
import DrawerClient from "./drawer-client";
import db from "@/lib/db";

export default async function PreviewButton({ projectId }: { projectId: string }) {
  const project = await db.project.findFirst({
    where: {
      id: projectId,
    },
  });
  return (
    <DrawerClient>
      {false ? (
        <div className="w-full text-sm text-muted-foreground h-[90%] flex justify-center items-center">
          Nothing to show...
        </div>
      ) : (
        <DisplayData projectId={project?.name ? project.name : ""} />
      )}
    </DrawerClient>
  );
}
