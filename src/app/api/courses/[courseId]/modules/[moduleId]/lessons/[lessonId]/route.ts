import { deleteLesson, updateLesson } from "@/backend/controllers/lessonController";

export async function PUT(
  req: Request,
  {
    params,
  }: { params: { courseId: string; moduleId: string; lessonId: string } }
) {
  const { courseId, moduleId, lessonId } = params;
  const { lesson } = await req.json();
  updateLesson(courseId, moduleId, lessonId, lesson);
  return Response.json("");
}

export async function DELETE(
  req: Request,
  {
    params,
  }: { params: { courseId: string; moduleId: string; lessonId: string } }
) {
  const { courseId, moduleId, lessonId } = params;
  try {
    await deleteLesson(courseId, moduleId, lessonId);
    return new Response("", {status: 200})
  }
  catch (err) {
    return new Response(err as string, { status: 400 });
  }
}
