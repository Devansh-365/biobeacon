import DashboardNav from "@/components/dashboard-nav";
import ShareLinkButton from "@/components/ui/share-link-button";
import { UserAccountNav } from "@/components/user-account-nav";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
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

  const project = await db.project.findFirst({
    where: {
      id: params.projectId,
      userId: user.id,
    },
  });

  if (!project) {
    redirect("/");
  }


  const navItems = [
    {
      path: `/dashboard/${params.projectId}`,
      name: "Links",
    },
    // {
    //   path: `/dashboard/${params.projectId}/customize`,
    //   name: "Customize",
    // },
    {
      path: `/dashboard/${params.projectId}/settings`,
      name: "Settings",
    },
  ];

  return (
    <div className="w-full min-h-screen">
      <DashboardNav navItems={navItems} showShare>
        <ShareLinkButton project={project} />
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
