import { NextRequest, NextResponse } from "next/server";
import { createLesson } from "../../_controllers/lessonController";

export async function POST(req: NextRequest, res: NextResponse) {
  const courseId = req.nextUrl.searchParams.get("id");
  const { title } = await req.json();
  console.log(`id: ${courseId}`)
  await createLesson(title, courseId);
  return NextResponse.json("Suc");
}
