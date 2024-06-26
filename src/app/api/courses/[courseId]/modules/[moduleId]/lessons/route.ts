import { createLesson } from "@/backend/controllers/lessonController";
import { isAdmin } from "@/backend/utils/isAdmin";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; moduleId: string } }
) {
  if (await isAdmin()) {
    const { courseId, moduleId } = params;
    const { title } = await req.json();
    let _id = await createLesson(courseId, moduleId, title);
    return NextResponse.json({ _id: _id }, { status: 200 });
  } else return NextResponse.json(null, { status: 401 });
}
