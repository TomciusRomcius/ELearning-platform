import {
  deleteLesson,
  updateLesson,
} from "@/backend/controllers/lessonController";
import { generateErrorResponse } from "@/backend/utils/generateErrorMessage";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  {
    params,
  }: { params: { courseId: string; moduleId: string; lessonId: string } }
) {
  try {
    const { courseId, moduleId, lessonId } = params;
    const { lesson } = await req.json();
    await updateLesson(courseId, moduleId, lessonId, lesson);
    return NextResponse.json(null);
  } catch (error) {
    const res = generateErrorResponse(error);
    return NextResponse.json(res.message, { status: res.status });
  }
}

export async function DELETE({
  params,
}: {
  params: { courseId: string; moduleId: string; lessonId: string };
}) {
  try {
    const { courseId, moduleId, lessonId } = params;
    await deleteLesson(courseId, moduleId, lessonId);
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    const res = generateErrorResponse(error);
    return NextResponse.json(res.message, { status: res.status });
  }
}
