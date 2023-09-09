import db from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { linkId: string } }
) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(req.url);

    const projectId = searchParams.get("projectId");

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!projectId) {
      return new NextResponse("Project ID missing", { status: 400 });
    }

    if (!params.linkId) {
      return new NextResponse("Link ID missing", { status: 400 });
    }

    const link = await db.link.delete({
      where: {
        id: params.linkId,
      },
    });

    return NextResponse.json(link);
  } catch (error) {
    console.log("[LINK_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { linkId: string } }
) {
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

    if (!params.linkId) {
      return new NextResponse("Link ID missing", { status: 400 });
    }

    if (url === "http://localhost:3000") {
      return new NextResponse("Url cannot be 'localhost'", { status: 400 });
    }

    const link = await db.link.update({
      where: {
        id: params.linkId,
      },
      data: {
        name,
        url,
        projectId,
      },
    });

    return NextResponse.json(link);
  } catch (error) {
    console.log("CHANNELS_PATCH", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
