import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { createCourse } from "../_controllers/couseController";

export async function POST(req: NextRequest, res: NextResponse) {
  const { title, description } = await req.json();
  try {
    await createCourse(title, description);
    return Response.json("success");
  }
  catch(error) {
    console.log(error);
    return Response.json("err", {
      status: 400
    });
  }
}
