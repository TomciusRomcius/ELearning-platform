import { createLesson } from "@/backend/controllers/lessonController";
import { createModule } from "@/backend/controllers/moduleController";
import { isAdmin } from "@/backend/utils/isAdmin";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  if (await isAdmin()) {
    const courseId = params.courseId;
    const { module } = await req.json();
    console.log(`id: ${courseId}`);
    try {
      const _id = await createModule(courseId, module);
      return NextResponse.json({ _id: _id });
    } catch (err) {
      return NextResponse.json(null, { status: 500 });
    }
  } else return NextResponse.json(null, { status: 401 });
}
