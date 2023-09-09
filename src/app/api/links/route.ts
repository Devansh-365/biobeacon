import db from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const { name, url } = await req.json();
    const { searchParams } = new URL(req.url);

    const projectId = searchParams.get("projectId");

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!projectId) {
      return new NextResponse("Project ID missing", { status: 400 });
    }

    if (url === "http://localhost:3000") {
      return new NextResponse("Url cannot be 'localhost'", { status: 400 });
    }

    const link = await db.link.create({
      data: {
        name,
        url,
        projectId,
      },
    });

    return NextResponse.json(link);
  } catch (error) {
    console.log("CHANNELS_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
