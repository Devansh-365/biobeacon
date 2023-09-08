import DashboardNav from "@/components/dashboard-nav";
import { UserAccountNav } from "@/components/user-account-nav";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { projectId: string };
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/auth/login");
  }

  const navItems = [
    {
      path: `/${params.projectId}`,
      name: "Links",
    },
    {
      path: `/${params.projectId}/customize`,
      name: "Customize",
    },
    {
      path: `/${params.projectId}/settings`,
      name: "Settings",
    },
  ];

  return (
    <div className="w-full min-h-screen">
      <DashboardNav navItems={navItems} showShare>
        <UserAccountNav
          user={{
            name: user?.name,
            image: user?.image,
            email: user?.email,
          }}
        />
      </DashboardNav>
      <main className="flex-1 bg-gray-100 h-screen">{children}</main>
    </div>
  );
}
