import { createModule } from "@/backend/controllers/moduleController";
import { generateErrorResponse } from "@/backend/utils/generateErrorMessage";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const courseId = params.courseId;
    const { module } = await req.json();
    const _id = await createModule(courseId, module);
    return NextResponse.json({ _id: _id });
  } catch (error) {
    console.error(error);
    const res = generateErrorResponse(error);
    return NextResponse.json(res.message, { status: res.status });
  }
}
