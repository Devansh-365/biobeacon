import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import db from "@/lib/db";
import { Icons } from "../icons";
import ExtraLink from "./extra-link";
import SocialLink from "./social-link";

export default async function DisplayData({
  projectId,
}: {
  projectId: string;
}) {
  const project = await db.project.findFirst({
    where: {
      name: projectId,
    },
    include: {
      links: true,
    },
  });
  const user = await db.user.findFirst({
    where: {
      id: project?.userId,
    },
  });
  console.log("PROJEECT: ", project);
  console.log("USER ID: ", user);

  return (
    <main className="p-2 h-full w-full space-y-8  max-w-lg mx-auto overflow-y-scroll hide_scrollbar">
      <div className="text-center">
        {user ? (
          <Avatar className="h-20 w-20 rounded-full overflow-hidden ring ring-slate-200 mx-auto">
            {user.image ? (
              <AvatarImage alt="Picture" src={user.image} />
            ) : (
              <AvatarFallback>
                <span className="sr-only">{user.name}</span>
                <Icons.user className="h-4 w-4" />
              </AvatarFallback>
            )}
          </Avatar>
        ) : (
          <></>
        )}
        {project && (
          <h1 className="text-2xl font-bold mt-4 text-slate-800">
            {project.name}
          </h1>
        )}
        {project?.bio && (
          <p className="text-sm mt-2 text-slate-600">{project.bio}</p>
        )}
      </div>
      <div className="flex items-center justify-center flex-wrap">
        {project &&
          project.links.map((link, id) => {
            return link.isSocial ? (
              <SocialLink url={link.url} key={id} />
            ) : null;
          })}
      </div>
      <ul className="space-y-2">
        {project &&
          project.links.map((link, id) => (
            <ExtraLink label={link.name} url={link.url} key={id} />
          ))}
      </ul>
    </main>
  );
}
