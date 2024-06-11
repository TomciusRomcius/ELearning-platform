"use server";

import { getEnrolledCourses } from "@/backend/controllers/courseController";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/authOptions";
import { CourseType } from "@/utils/types";
import CourseCard from "@/frontend/components/CourseCard";
import MainHeader from "@/frontend/ui/MainHeader";

export default async function MyCourses() {
  const session = await getServerSession(authOptions);
  const enrolledCourses: CourseType[] = await getEnrolledCourses(
    session?.user.id
  );

  return (
    <>
      <MainHeader />
      <div>
        <section className="flex flex-col gap-10 px-60">
          <h1 className="text-6xl text-center">Browse</h1>
          <div className="flex flex-row flex-wrap gap-10">
            {enrolledCourses.map((course) => (
              <CourseCard url={course?._id} title={course?.title} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
