import { NextRequest, NextResponse } from "next/server";
import {
  createCourse,
  deleteCourse,
  getCourse,
  updateCourse,
} from "@/backend/controllers/courseController";
import { APICourseType } from "@/utils/apiTypes";

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
  await createCourse(title, courseId);
  return NextResponse.json("Suc");
}

// Update course
export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  const courseId = params.courseId;
  const { course }: { course: APICourseType } = await req.json();
  try {
    await updateCourse(courseId, course);
  } catch (err) {
    return NextResponse.json({}, { status: 401 });
  }

  return NextResponse.json({}, { status: 200 });
}

export async function DELETE(req: NextRequest, { params }: { params: { courseId: string }  }) {
  const courseId = params.courseId;
  try {
    await deleteCourse(courseId);
  }

  catch (err) {
    return NextResponse.json({}, { status: 401 });
  }

  return NextResponse.json({}, { status: 200 });
}

