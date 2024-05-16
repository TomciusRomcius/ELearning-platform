import { NextResponse } from "next/server";
import { createLesson } from "../../_controllers/lessonController";
import { getCourse } from "../../_controllers/courseController";

// Load course
export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  const courseId = params.courseId;

  // If course id was not provided
  if (courseId === null) {
    return NextResponse.json(null, {
      status: 400,
    });
  }
  const course = await getCourse(courseId);
  return NextResponse.json(course);
}

// Create new course
export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  const courseId = params.courseId;
  const { title } = await req.json();
  console.log(`id: ${courseId}`);
  await createLesson(title, courseId);
  return NextResponse.json("Suc");
}

// Update course
export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  const courseId = params.courseId;
}
