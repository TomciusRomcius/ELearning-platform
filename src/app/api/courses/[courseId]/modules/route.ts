import { createLesson } from "@/app/api/_controllers/lessonController";
import { createModule } from "@/app/api/_controllers/moduleController";
import { NextResponse } from "next/server";

export async function POST(req: Request, {params}: {params: {courseId: string}}) {
  const courseId = params.courseId;
  const { moduleName } = await req.json();
  console.log(`id: ${courseId}`)
  await createModule(courseId, moduleName);
  return NextResponse.json("Suc");
}