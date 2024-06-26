import {
  deleteLesson,
  updateLesson,
} from "@/backend/controllers/lessonController";
import { isAdmin } from "@/backend/utils/isAdmin";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  {
    params,
  }: { params: { courseId: string; moduleId: string; lessonId: string } }
) {
  if (await isAdmin()) {
    const { courseId, moduleId, lessonId } = params;
    const { lesson } = await req.json();
    await updateLesson(courseId, moduleId, lessonId, lesson);
    return NextResponse.json(null);
  } else return NextResponse.json(null, { status: 401 });
}

export async function DELETE(
  req: Request,
  {
    params,
  }: { params: { courseId: string; moduleId: string; lessonId: string } }
) {
  if (await isAdmin()) {
    const { courseId, moduleId, lessonId } = params;
    try {
      await deleteLesson(courseId, moduleId, lessonId);
      return new NextResponse("", { status: 200 });
    } catch (err) {
      return new NextResponse(err as string, { status: 500 });
    }
  } else return NextResponse.json(null, { status: 401 });
}
