import { NextRequest, NextResponse } from "next/server";
import {
  createCourse,
  getCourses,
} from "@/backend/controllers/courseController";
import { uploadFile } from "@/utils/fileOperations";
import { generateErrorResponse } from "@/backend/utils/generateErrorMessage";

export async function GET() {
  try {
    const courses = await getCourses();
    return NextResponse.json(courses);
  } catch (error) {
    console.error(error);
    const res = generateErrorResponse(error);
    return NextResponse.json(res.message, { status: res.status });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    let courseString = formData.get("course") as string;
    const course = JSON.parse(courseString);
    const { title, description, category } = course;
    const id = await createCourse(title, description, category);
    await uploadFile(id, formData.get("file") as File);
    return NextResponse.json(id, { status: 200 });
  } catch (error) {
    console.error(error);
    const res = generateErrorResponse(error);
    return NextResponse.json(res.message, { status: res.status });
  }
}
