import { deleteModule } from "@/app/api/_controllers/moduleController";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; moduleId: string } }
) {
  const { courseId, moduleId } = params;
  try {
    await deleteModule(courseId, moduleId);
    return NextResponse.json("", { status: 200 });
  } catch (err) {
    return NextResponse.json(err as string, { status: 400 });
  }
}
