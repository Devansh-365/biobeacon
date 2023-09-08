import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { user } = await session;
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    const project = await db.project.create({
      data: {
        name,
        userId: user?.id,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log("[PROJECTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
