import DashboardNav from "@/components/dashboard-nav";
import Navbar from "@/components/navbar";
import { UserAccountNav } from "@/components/user-account-nav";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { redirect, usePathname } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { projectId: string };
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <div className="w-full min-h-screen">
      <DashboardNav>
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
