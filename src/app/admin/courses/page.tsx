"use client";

import { CourseType } from "@/utils/types";
import { useEffect, useState } from "react";
import CourseTable from "./ui/CourseTable";
import courseService from "@/frontend/services/courseService";

export default function CoursesTab() {
  const [courses, setCourses] = useState<CourseType[]>([]);

  useEffect(() => {
    courseService.getCourses().then((fetchedCourses) => {
      setCourses(fetchedCourses);
    });
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center flex-1">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl text-center">Courses</h1>
        <div className="w-full">
          <input placeholder="Search" />
        </div>
        <CourseTable courses={courses}/>
      </div>
    </div>
  );
}
