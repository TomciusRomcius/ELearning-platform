"use server"

import { getEnrolledCourses } from "@/backend/controllers/courseController"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/authOptions";
import { CourseType } from "@/utils/types";

export default async function MyCourses() {
  const session = await getServerSession(authOptions);
  const enrolledCourses: CourseType[] = await getEnrolledCourses(session?.user.id);

  return (
    <div>
      {enrolledCourses.map((course) => <h1>{course.title}</h1>)}
    </div>
  )
}