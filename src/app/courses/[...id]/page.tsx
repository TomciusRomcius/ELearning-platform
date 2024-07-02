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
  if (!session?.user?.id) {
    await navigate("/auth/sign-in");
    return; // For TS
  }
    

  let courseId = params.id[0];

  if (searchParams.isAdmin && session?.user?.role === UserRole.ADMIN) {
    return <AdminPage/>
  }
  
  else if (searchParams.isAdmin) {
    await navigate("/not-authorized");
    return; // For TS
  }
  
  // Convert CourseType to ClientCourseType and return Client page
  // if the view is not admin view
  const course = await getCourse(courseId);
  if (!course) throw "Course not found!";
  const isEnrolled = await isUserEnrolled(session?.user?.id, courseId);

  if (isEnrolled) {
    const completedLessonIdsArray = await getCompletedLessons(session?.user.id, course._id.toString());
    const completedLessonIds = new Set<string>();
    for (const lessonId of completedLessonIdsArray) {
      completedLessonIds.add(lessonId);
      console.log(lessonId);
    }

    return <ClientPage course={course} completedLessonIds={completedLessonIds}/>
  }
  else {
    return <EnrollPage course={course}/>
  }
}
