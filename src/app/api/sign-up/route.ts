import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { createUser } from "../../../backend/controllers/userController";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { username, password, admin } = await req.json();
    if (!admin) {
      await createUser(username, password);
    }
    else {
      await createUser(username, password, true);
    }
  }
  catch(err) {
    console.log(err);
  }
  return Response.json("Post request");
}