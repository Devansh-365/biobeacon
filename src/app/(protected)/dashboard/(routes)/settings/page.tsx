import DashboardNav from "@/components/dashboard-nav";
import SettingsLayout from "@/components/settings-layout";
import { UserAccountNav } from "@/components/user-account-nav";
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

const navItems = [
  {
    path: "/dashboard",
    name: "Projects",
  },
  {
    path: "/dashboard/settings",
    name: "Settings",
  },
];

export default async function SetingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const projects = await db.project.findMany({
    where: {
      userId: user.id,
    },
  });

  const navItems2 = [
    {
      href: `/dashboard/settings`,
      name: "General",
    },
  ];
  return (
    <>
      <DashboardNav navItems={navItems}>
        <UserAccountNav
          user={{
            name: user?.name,
            image: user?.image,
            email: user?.email,
          }}
        />
      </DashboardNav>
      <SettingsLayout tabs={navItems2}>SetingsPage</SettingsLayout>;
    </>
  );
}
