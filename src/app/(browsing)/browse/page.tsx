"use client";

import { useEffect, useState } from "react";
import MainHeader from "@/frontend/ui/MainHeader";
import { CourseType } from "@/utils/types";
import courseService from "@/frontend/services/courseService";
import { generateBody } from "../_utils/generateBody";
import BodyLayout from "../_layouts/BodyLayout";

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
        <BodyLayout>
          <h1 className="text-6xl text-center">Browse</h1>
          {bodyElements}
        </BodyLayout>
      </main>
    </>
  );
}
