"use client";

import { useEffect, useState } from "react";
import CourseCard from "@/frontend/components/CourseCard";
import MainHeader from "@/frontend/ui/MainHeader";
import { CourseType } from "@/utils/types";
import courseService from "@/frontend/services/courseService";
import { getCategoryToCourseMap } from "../utils/getCategoryToCourseMap";
import { generateBody } from "../utils/generateBody";

export default function Page() {
  let [courses, setCourses] = useState<CourseType[]>([]);
  let bodyElements: React.JSX.Element[] = generateBody(courses);

  useEffect(() => {
    courseService.getCourses().then((fetchedCourses) => {
      setCourses(fetchedCourses);
    });
  }, []);

  return (
    <>
      <MainHeader />

      <main className="flex flex-col h-26 gap-10">
        <section className="flex flex-col gap-10 px-60 py-10">
          <h1 className="text-6xl text-center">Browse</h1>
          {bodyElements}
        </section>
      </main>
    </>
  );
}
