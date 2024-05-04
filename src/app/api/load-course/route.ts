import { NextRequest, NextResponse } from "next/server";
import { getCourse } from "../_controllers/couseController";

export async function GET(req: NextRequest, res: NextResponse) {
  const courseId = req.nextUrl.searchParams.get("id");

  // If course id was not provided
  if (courseId === null) {
    return NextResponse.json(null, {
      status: 400,
    });
  }
  const course = await getCourse(courseId);
  return NextResponse.json(course);
}
