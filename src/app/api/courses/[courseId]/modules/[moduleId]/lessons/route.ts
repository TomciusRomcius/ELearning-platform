import { createLesson } from "@/backend/controllers/lessonController";
import { generateErrorResponse } from "@/backend/utils/generateErrorMessage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string; moduleId: string } }
) {
  try {
    const { courseId, moduleId } = params;
    const { title } = await req.json();
    let _id = await createLesson(courseId, moduleId, title);
    return NextResponse.json({ _id: _id }, { status: 200 });
  } catch (error) {
    const res = generateErrorResponse(error);
    return NextResponse.json(res.message, { status: res.status });
  }
}
