import fs from "fs";

import { CourseModel } from "@/backend/models/courseModel";
import courseData from '@/../prepopulated/courses.json' assert { type: 'json' };
import { NextResponse } from "next/server";

export async function GET() {
  await CourseModel.create(courseData);
  
  return NextResponse.json("");
}