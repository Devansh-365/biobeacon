import SettingsLayout from "@/components/settings-layout";
import React from "react";

export default function SetingsPage({
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
  return <SettingsLayout tabs={navItems}>SetingsPage</SettingsLayout>;
}