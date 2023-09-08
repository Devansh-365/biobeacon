import db from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { useSession } from "next-auth/react";

export default async function Mobile({ projectId }: { projectId: string }) {
  const project = await db.project.findFirst({
    where: {
      id: projectId,
    },
  });
  console.log("PROJEECT: ", project);
  const url =
    process.env.NODE_ENV === "development"
      ? `http://localhost:3000/${project?.name}?isIframe=true`
      : `https://biobeacon.vercel.app/${project?.name}?isIframe=true`;

  return (
    <>
      <div className="relative border-[4px] lg:border-[8px] border-black rounded-[2.5rem] w-60 lg:w-60 xl:w-64 aspect-[9/19] overflow-hidden max-w-sm mx-auto z-0">
        <div className="absolute inset-0 z-10 ">
          {true && (
            <iframe
              seamless
              loading="lazy"
              title="preview"
              id="preview"
              className="h-full w-full"
              src={url}
            ></iframe>
          )}
        </div>
      </div>
    </>
  );
}
