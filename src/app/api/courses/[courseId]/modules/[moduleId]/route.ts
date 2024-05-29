import { deleteModule, updateModulePatch } from "@/backend/controllers/moduleController";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; moduleId: string } }
) {
  const { courseId, moduleId } = params;
  let { module } = await req.json();
  try {
    await updateModulePatch(courseId, moduleId, module)
    return NextResponse.json("", { status: 200 });
  }
  catch (err) {
    return NextResponse.json("", { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; moduleId: string } }
) {
  const { courseId, moduleId } = params;
  try {
    await deleteModule(courseId, moduleId);
    return NextResponse.json("", { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err as string, { status: 400 });
  }
}
