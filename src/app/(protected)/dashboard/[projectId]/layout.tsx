import Navbar from "@/components/navbar";
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

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
