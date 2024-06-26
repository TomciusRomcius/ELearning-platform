import { NextRequest, NextResponse } from "next/server";
import {
  createCourse,
  getCourses,
} from "@/backend/controllers/courseController";
import { uploadFile } from "@/utils/fileOperations";
import { isAdmin } from "@/backend/utils/isAdmin";

export async function GET(req: NextRequest) {
  try {
    const courses = await getCourses();
    return NextResponse.json(courses);
  } catch (error) {
    console.log(error);
    return Response.json("err", {
      status: 400,
    });
  }
}

export async function POST(req: NextRequest) {
  if (await isAdmin()) {
    const formData = await req.formData();
    let courseString = formData.get("course") as string;
    const course = JSON.parse(courseString);
    const { title, description, category } = course;
    const id = await createCourse(title, description, category);
    const file = formData.get("file") as File;
    await uploadFile(id, formData.get("file") as File);
    return NextResponse.json(null, { status: 200 });
  } else return NextResponse.json(null, { status: 401 });
}
