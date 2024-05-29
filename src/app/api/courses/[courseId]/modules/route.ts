import { createLesson } from "@/backend/controllers/lessonController";
import { createModule } from "@/backend/controllers/moduleController";
import { NextResponse } from "next/server";

export async function POST(req: Request, {params}: {params: {courseId: string}}) {
  const courseId = params.courseId;
  const { module } = await req.json();
  console.log(`id: ${courseId}`)
  const _id = await createModule(courseId, module);
  return NextResponse.json({ _id: _id });
}