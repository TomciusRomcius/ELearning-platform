import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { enrollInCourse } from "@/backend/controllers/courseController";
import { getSessionServer } from "@/backend/utils/getServerSession";

export async function GET() {
  const session = await getServerSession();
  return NextResponse.json(session);
}

export async function POST(req: Request) {
  const session = await getSessionServer();
  if (!session?.user) {
    return NextResponse.json({}, { status: 401 });
  }
  const { courseId } = await req.json();
  enrollInCourse(session.user.id, courseId);
  return NextResponse.json({}, { status: 200 });
}
