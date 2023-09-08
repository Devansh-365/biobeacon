import React from "react";
import AddProjectLink from "../ui/add-project-link";
import ActionButton from "./action-button";
import db from "@/lib/db";


export default async function Editor({ projectId }: { projectId: string }) {
  const links = await db.link.findMany({
    where: {
      projectId,
    },
  });

  console.log("LINKS: ", links);

  return (
    <div className="max-w-[640px] flex-1 mx-auto my-10">
      <AddProjectLink />
      <div className="my-10">
        {links?.length != 0 &&
          links.map((link, i) => (
            <React.Fragment key={i}>
              <div
                key={i}
                className="flex justify-between bg-white items-center p-2 rounded-lg drop-shadow-md my-5 w-full"
              >
                <p></p>
                <ActionButton text="dsds" />
              </div>
            </React.Fragment>
          ))}
        {links?.length === 0 && (
          <div className="mt-4 w-[245px] h-auto flex flex-col mx-auto">
            {/* <Image
            className="object-cover"
            width="220"
            height="220"
            alt="not-found"
            src="/assets/not-found.png"
          /> */}
            <h3 className="font-bold text-lg mt-3 text-[#222]">
              You don&apos;t have any links yet
            </h3>
            <p className="text-sm text-[#555] text-center px-3">
              Please click on the button above to add your first link 🚀
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
