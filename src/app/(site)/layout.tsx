import React from "react";

import Navbar from "@/components/navbar";
import { CrispChat } from "@/components/crisp-chat";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <CrispChat />
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
