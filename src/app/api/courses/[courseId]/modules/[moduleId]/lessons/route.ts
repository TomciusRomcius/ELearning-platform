import { createLesson } from "@/backend/controllers/lessonController";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; moduleId: string } }
) {
  const { courseId, moduleId } = params;
  const { title } = await req.json();
  await createLesson(courseId, moduleId, title);
  return new Response("a");
}
