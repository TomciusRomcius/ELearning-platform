"use server";

import { getEnrolledCourses } from "@/backend/controllers/courseController";
import { CourseType } from "@/utils/types";
import CourseCard from "@/frontend/components/CourseCard";
import MainHeader from "@/frontend/ui/MainHeader";
import { navigate } from "@/utils/navigation";
import { getSessionServer } from "@/backend/utils/getServerSession";
import { generateBody } from "../utils/generateBody";

export default async function MyCourses() {
  const session = await getSessionServer();
  // If the user is not logged in, redirect to log in page.
  if (!session?.user) {
    await navigate("/auth/sign-in");
    return;
  }
  const enrolledCourses: CourseType[] = await getEnrolledCourses(
    session?.user.id
  );

  const bodyElements = generateBody(enrolledCourses);

  return (
    <>
      <MainHeader />
      <section className="flex flex-col gap-10 px-60 py-10">
        <h1 className="text-6xl text-center">Browse</h1>
        <div className="flex flex-col flex-wrap gap-10">{bodyElements}</div>
      </section>
    </>
  );
}
