import DisplayData from "@/components/preview/display-data";
import db from "@/lib/db";
import React from "react";

export default function page({ params }: { params: { projectLink: string } }) {
  return <DisplayData projectId={params?.projectLink} />;
}
