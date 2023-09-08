import DashboardNav from "@/components/dashboard-nav";
import CreateProjectButton from "@/components/ui/create-project-button";
import { UserAccountNav } from "@/components/user-account-nav";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/session";

const navItems = [
  {
    path: "/dashboard",
    name: "Projects",
  },
  {
    path: "/settings",
    name: "Settings",
  },
];

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const projects = await db.project.findMany();
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
      <main className="flex-1 bg-gray-100 h-screen">
        <section className="flex h-36 items-center border-b border-gray-200 bg-white">
          <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">My Projects</h1>
              <CreateProjectButton />
            </div>
          </div>
        </section>
        <section className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
          <div className="my-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <Link
                key={i}
                href={`/dashboard/${project.id}`}
                className="flex flex-col space-y-10 rounded-lg border border-gray-100 bg-white p-6 shadow transition-all hover:shadow-lg"
              >
                {project?.name}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
