import db from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { useSession } from "next-auth/react";
import DisplayData from "./display-data";

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
      <div className="relative mx-auto border-primary bg-primary border-[14px] rounded-[2.5rem] min-w-[350px] h-[700px] w-[350px] shadow-xl">
        <div className="w-[148px] h-[18px] bg-primary top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
        <div className="h-[46px] w-[4px] bg-primary absolute -left-[17px] top-[124px] rounded-l-lg"></div>
        <div className="h-[46px] w-[4px] bg-primary absolute -left-[17px] top-[178px] rounded-l-lg"></div>
        <div className="h-[64px] w-[4px] bg-primary absolute -right-[17px] top-[142px] rounded-r-lg"></div>
        <div className="rounded-[2rem] overflow-hidden w-full h-full break-words">
          <div className="bg-white h-full overflow-y-scroll hide_scrollbar pt-10 px-2">
            {true ? (
              <div className="w-full text-sm text-muted-foreground h-[90%] flex justify-center items-center">
                Nothing to show...
              </div>
            ) : (
              <DisplayData />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
