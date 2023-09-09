import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { user } = await session;
    const body = await req.json();

    const { name, bio, image } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.projectId) {
      return new NextResponse("Project id is required", { status: 400 });
    }

    const project = await db.project.updateMany({
      where: {
        id: params.projectId,
        userId: user.id,
      },
      data: {
        ...(name && { name }),
        ...(bio && { bio }),
        ...(image && { image }),
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log("[PROJECT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
