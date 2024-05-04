import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { getCourses } from "../_controllers/couseController";

export async function GET(req: NextRequest, res: NextResponse) {
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
