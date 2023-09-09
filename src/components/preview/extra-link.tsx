import React from "react";
import { Icons } from "../icons";

interface ExtraLinkProps {
  label: string;
  url: string;
  icon?: string;
}

export default function ExtraLink({ label, url, icon }: ExtraLinkProps) {
  return (
    <li>
      {label && url && (
        <a href={url} target="_blank">
          <dt className="flex items-center space-x-2 p-1 -m-1 rounded-xl hover:bg-slate-100 bg-slate-50">
            <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg text-slate-500">
              <Icons.link className="w-4 h-4" />
            </div>
            <div className="w-full flex-grow min-w-0">
              <p className="font-medium text-sm leading-6 text-accent-foreground">
                {label}
              </p>
            </div>
          </dt>
        </a>
      )}
    </li>
  );
}
