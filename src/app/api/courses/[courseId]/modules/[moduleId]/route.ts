import {
  deleteModule,
  updateModulePatch,
} from "@/backend/controllers/moduleController";
import { isAdmin } from "@/backend/utils/isAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string; moduleId: string } }
) {
  if (await isAdmin()) {
    const { courseId, moduleId } = params;
    let { module } = await req.json();
    try {
      await updateModulePatch(courseId, moduleId, module);
      return NextResponse.json(null, { status: 200 });
    } catch (err) {
      return NextResponse.json(null, { status: 500 });
    }
  } else return NextResponse.json(null, { status: 401 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string; moduleId: string } }
) {
  if (await isAdmin()) {
    const { courseId, moduleId } = params;
    try {
      await deleteModule(courseId, moduleId);
      return NextResponse.json("", { status: 200 });
    } catch (err) {
      console.error(err);
      return NextResponse.json(null, { status: 500 });
    }
  } else return NextResponse.json(null, { status: 401 });
}
