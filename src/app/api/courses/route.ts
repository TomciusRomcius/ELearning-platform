import { NextRequest, NextResponse } from "next/server";
import { createCourse, getCourses } from "@/backend/controllers/courseController";
import { uploadFile } from "@/utils/fileOperations";

export async function GET(req: NextRequest) {
  try {
    const courses = await getCourses();
    return NextResponse.json(courses);
  }
  catch(error) {
    console.log(error);
    return Response.json("err", {
      status: 400
    });
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  let courseString = formData.get("course") as string;
  const course = JSON.parse(courseString);
  const { title, description, category } = course;
  const id = await createCourse(title, description, category);
  const file = formData.get("file") as File;
  await uploadFile(id, formData.get("file") as File);
  return new NextResponse("suc");
}