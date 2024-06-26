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
import { navigate } from "@/utils/navigation";
import { UserRole } from "@/backend/models/userModel";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string[] };
  searchParams: { isAdmin: boolean };
}) {
  const session = await getServerSession(authOptions);
  
  // If the user hasn't log in, redirect to sign in page
  if (!session?.user) 
    await navigate("/auth/sign-in");

  let courseId = params.id[0];

  if (searchParams.isAdmin && session?.user?.role === UserRole.ADMIN) {
    return <AdminPage/>
  }
  
  else if (searchParams.isAdmin) {
    await navigate("/not-authorized");
  }
  
  // Convert CourseType to ClientCourseType and return Client page
  // if the view is not admin view
  let course = await getCourse(courseId);
  const isEnrolled = await isUserEnrolled(session?.user?.id, courseId);
  if (isEnrolled) {
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

    return <ClientPage course={course}/>
  }

  else 
  return <EnrollPage course={course}/>
}
