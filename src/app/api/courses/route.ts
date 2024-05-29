import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { createCourse, getCourses } from "../../../backend/controllers/courseController";

export async function GET(req: Request) {
  try {
    const courses = await getCourses();
    return Response.json(courses);
  }
  catch(error) {
    console.log(error);
    return Response.json("err", {
      status: 400
    });
  }
}

export async function POST(req: Request) {
  let { title, description } = await req.json();
  await createCourse(title, description);
  return new NextResponse("suc");
}