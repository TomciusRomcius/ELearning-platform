import { CourseModel } from "@/backend/models/courseModel";
import courseData from '@/../prepopulated/courses.json' assert { type: 'json' };
import { NextResponse } from "next/server";
import { isAdmin } from "@/backend/utils/isAdmin";
import { ERROR_TYPE } from "@/backend/utils/errorTypes";

export async function GET() {
  if (await isAdmin()) {
    await CourseModel.create(courseData);
  }
  else {
    const error = ERROR_TYPE.unauthorized;
    return NextResponse.json(error.message, { status: error.status });
  }
}