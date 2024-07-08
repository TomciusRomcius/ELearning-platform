import { NextRequest, NextResponse } from "next/server";
import { completeLesson, getCompletedLessons } from "@/backend/controllers/lessonController";
import { getSessionServer } from "@/backend/utils/getServerSession";

export async function GET(req: NextRequest) {
  const session = await getSessionServer();
  if (!session?.user) {
    return NextResponse.json("User not logged in", { status: 401 });
  }
  const { courseId } = await req.json();
  const completedLessonIds = await getCompletedLessons(session.user.id, courseId);
  return NextResponse.json({ completedLessonIds: completedLessonIds }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const session = await getSessionServer();
  if (!session?.user) {
    return NextResponse.json("User not logged in", { status: 401 });
  }
  const { courseId, lessonId } = await req.json();
  await completeLesson(session.user.id ,courseId, lessonId);
  return NextResponse.json({}, { status: 200 });
}