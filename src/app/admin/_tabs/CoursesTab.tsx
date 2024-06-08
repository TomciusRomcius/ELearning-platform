"use client";

import { getCourses } from "@/frontend/services/getCourses";
import { navigate } from "@/utils/navigation";
import { CourseType } from "@/utils/types";
import { useEffect, useState } from "react";

export default function CoursesTab() {
  const [courses, setCourses] = useState<CourseType[]>([]);

  const onCreateCourse = () => {
    navigate("/admin/new-course");
  };

  useEffect(() => {
    getCourses().then((fetchedCourses) => {
      setCourses(fetchedCourses);
    });
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center flex-1 p-14">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl text-center">Courses</h1>
        <div className="w-full">
          <input placeholder="Search" />
        </div>
        <table>
          <tbody>
            <tr className="border-b-1 border-border">
              <td className="px-24 py-2 font-bold">Name</td>
              <td className="px-24 py-2 font-bold">Description</td>
              <td className="px-24 py-2 font-bold">Category</td>
            </tr>
            {courses.map((course) => (
              <>
                <tr className="border-b-1 border-border">
                  <td className="px-24 py-2">{course.title}</td>
                  <td className="px-24 py-2">{course.description}</td>
                  <td className="px-24 py-2">Category not defined</td>
                  <td className="px-24 py-4">
                    <button
                      onClick={() =>
                        navigate(`/courses/${course._id}?isAdmin=1`)
                      }
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </>
            ))}
            <tr>
              <td className="py-2">
                <button onClick={onCreateCourse}>Create course</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
