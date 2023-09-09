import db from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const session = await getCurrentUser();
    const { name, email, image } = await req.json();

    const user = await db.user.update({
      where: {
        id: session?.id,
      },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(image && { image }),
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("USER_PATCH", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
