"use client"
import { useEffect, useState } from "react";
import CourseCard from "./_components/CourseCard";
import axios from "axios";

export default function Page() {
  let [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("api/courses")
      .then((courses) => {
        setCourses(courses.data);
        console.log(courses.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  return (
    <main className="flex flex-col gap-10">
      <header className="flex justify-between px-20 py-5 items-center border-b-2 border-gray-200">
        <span className="flex gap-20">
          <a href="my-courses">My courses</a>
          <a href="browse-courses">Courses</a>
        </span>
        <span className="flex gap-20">
          <a href="my-courses">My courses</a>
          <a href="browse-courses">Courses</a>
        </span>
      </header>
      <section className="flex flex-col gap-10 px-60">
        <h1 className="text-6xl text-center">Browse</h1>
        <div className="flex flex-wrap justify-start gap-10">
          {courses.map((course) => <CourseCard url={course?._id} title={course?.title}/>)}
        </div>
      </section>
    </main>
  );
}
