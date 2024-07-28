"use client";

import { CourseType } from "@/utils/types";
import { useEffect, useState } from "react";
import CourseTable from "./ui/CourseTable";
import courseService from "@/frontend/services/courseService";

export default function CoursesTab() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [searchInput, setSearchInput] = useState("");

  let filteredCourses: CourseType[] = [];
  if (!searchInput) filteredCourses = courses;
  else {
    courses.forEach((course) => {
      const title = course.title.toLowerCase();
      if (title.startsWith(searchInput)) {
        filteredCourses.push(course);
      }
    });
  }

  const updateFilter = (e: InputEvent) =>
    setSearchInput(e.currentTarget.value.toLowerCase());

  useEffect(() => {
    courseService.getCourses().then((fetchedCourses) => {
      setCourses(fetchedCourses);
    });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl text-center">Courses</h1>
      <div className="w-full">
        <input onChange={updateFilter} placeholder="Search" />
      </div>
      <div className=" overflow-x-auto">
        <CourseTable courses={filteredCourses} />
      </div>
    </div>
  );
}
