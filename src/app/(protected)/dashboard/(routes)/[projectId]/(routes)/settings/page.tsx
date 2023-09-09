import SettingsLayout from "@/components/settings-layout";
import React from "react";
import { SettingsClient } from "./components/settings-client";
import db from "@/lib/db";

export default async function SetingsPage({
  params,
}: {
  params: { projectId: string };
}) {
  const navItems = [
    {
      href: `/dashboard/${params.projectId}/settings`,
      name: "General",
    },
  ];

  const project = await db.project.findFirst({
    where: {
      id: params?.projectId,
    },
  });
  return (
    <SettingsLayout tabs={navItems}>
      <SettingsClient project={project} />
    </SettingsLayout>
  );
}
