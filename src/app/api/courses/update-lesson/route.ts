import { NextRequest, NextResponse } from "next/server";
import { updateLesson } from "../../_controllers/lessonController";

export async function POST(req: NextRequest, res: NextResponse) {
  const courseId = req.nextUrl.searchParams.get("courseId");
  const lessonId = req.nextUrl.searchParams.get("lessonId");
  const { lesson } = await req.json();
  if (!courseId || !lessonId) return;
  updateLesson(courseId, lessonId, lesson)
  return Response.json("");
}