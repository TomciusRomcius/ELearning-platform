import { NextRequest, NextResponse } from "next/server";
import { createUser } from "../../../backend/controllers/userController";
import { generateErrorResponse } from "@/backend/utils/generateErrorMessage";

export async function POST(req: NextRequest) {
  try {
    const { username, password, admin } = await req.json();
    if (!admin) {
      await createUser(username, password);
    } else {
      await createUser(username, password, true);
    }
    return NextResponse.json(null);
  } catch (error) {
    const res = generateErrorResponse(error);
    return NextResponse.json(res.message, { status: res.status });
  }
}
