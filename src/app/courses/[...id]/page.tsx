"use server";

import { getServerSession } from "next-auth";
import AdminPage from "./admin/AdminPage";
import ClientPage from "./client/ClientPage";
import { getCourse } from "@/backend/controllers/courseController";
import { isUserEnrolled } from "@/backend/utils/isUserEnrolled";
import { authOptions } from "@/app/api/auth/authOptions";
import EnrollPage from "./enroll/EnrollPage";
import { getCompletedLessons } from "@/backend/controllers/lessonController";
import { ClientCourseType } from "@/utils/types";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string[] };
  searchParams: { isAdmin: boolean };
}) {
  const session = await getServerSession(authOptions);
  
  let courseId = params.id[0];
  // No security yet
  let isAdmin = searchParams.isAdmin;
  
  // Convert CourseType to ClientCourseTypoe 
  let course = await getCourse(courseId);
  let completedLessonIds = await getCompletedLessons(session?.user.id, course._id.toString());
  let clientCourse: ClientCourseType = course as ClientCourseType;
  clientCourse.modules.forEach((module) => {
    module.lessons.forEach((lesson) => {
      let exists = completedLessonIds.includes(lesson._id.toString());
      if (exists) {
        lesson.completed = true;
      }
      else lesson.completed = false;
    });
  });

  const isEnrolled = await isUserEnrolled(session?.user?.id, courseId);

  if (isAdmin) return <AdminPage/>
  if (isEnrolled) return <ClientPage course={course}/>
  else return <EnrollPage courseId={courseId}/>
}
