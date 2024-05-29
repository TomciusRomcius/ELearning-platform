import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { createUser } from "../../../backend/controllers/userController";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { username, password } = await req.json();
    await createUser(username, password);
  }
  catch(err) {
    console.log(err);
  }
  return Response.json("Post request");
}