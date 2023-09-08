import { Icons } from "@/components/icons";
import ProjectCards from "@/components/project-cards";
import { Button } from "@/components/ui/button";
import CreateProjectButton from "@/components/ui/create-project-button";
import db from "@/lib/db";
import Link from "next/link";

export default async function DashboardPage() {
  const projects = await db.project.findMany();
  console.log("PROJECTS: ", projects);

  return (
    <>
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
              href="#"
              className="flex flex-col space-y-10 rounded-lg border border-gray-100 bg-white p-6 shadow transition-all hover:shadow-lg"
            >
              {project?.name}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
