"use client";

import { useEffect, useState } from "react";
import CourseCard from "@/frontend/components/CourseCard";
import { getCourses } from "@/frontend/services/getCourses";
import MainHeader from "@/frontend/ui/MainHeader";
import { CourseType } from "@/utils/types";

export default function Page() {
  let [courses, setCourses] = useState<CourseType[]>([]);

  useEffect(() => {
    getCourses().then((fetchedCourses) => {
      setCourses(fetchedCourses);
    });
  }, []);

  return (
    <>
      <MainHeader />

      <main className="flex flex-col h-26 gap-10">
        <section className="flex flex-col gap-10 px-60">
          <h1 className="text-6xl text-center">Browse</h1>
          <div className="flex flex-row flex-wrap gap-10">
            {courses.map((course) => (
              <CourseCard url={course?._id} title={course?.title} description={course?.description} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
