"use client";

import { useEffect, useState } from "react";
import CourseCard from "@/frontend/components/CourseCard";
import { getCourses } from "@/frontend/services/getCourses";
import MainHeader from "@/frontend/ui/MainHeader";
import { CourseType } from "@/utils/types";

export default function Page() {
  let [courses, setCourses] = useState<CourseType[]>([]);
  let categoryToCourseMap = new Map<string, CourseType[]>();
  const categories: string[] = [];
  courses.forEach((course) => {
    if (!categoryToCourseMap.get(course.category)) {
      categoryToCourseMap.set(course.category, []);
    }
    categoryToCourseMap.get(course.category)?.push(course);
  });
  let bodyElements: React.JSX.Element[] = [];

  categoryToCourseMap.forEach((mapCourses, category) => {
    bodyElements.push(
      <>
        <h4 className="text-2xl">{category}</h4>
        <div className="flex flex-row flex-wrap gap-10">
          {mapCourses.map((course) => (
            <CourseCard
              key={course._id}
              url={course?._id}
              title={course?.title}
              description={course?.description}
              category={course.category}
            />
          ))}
        </div>
      </>
    );
  });

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
          {bodyElements}
        </section>
      </main>
    </>
  );
}
