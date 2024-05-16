import { updateLesson } from "@/app/api/_controllers/lessonController";

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
