import { createLesson } from "@/backend/controllers/lessonController";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; moduleId: string } }
) {
  const { courseId, moduleId } = params;
  const { title } = await req.json();
  let _id = await createLesson(courseId, moduleId, title);
  return NextResponse.json({ _id: _id }, { status: 200 });
}
