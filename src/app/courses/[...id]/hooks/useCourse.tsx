import axios from "axios";
import { redirect, useParams } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { CourseType, LessonType } from "../utils/types";

export function useCourse() {
  let [course, setCourse] = useState<CourseType>();
  let [currentLesson, setCurrentLesson] = useState<LessonType>()
  let err = "";
  const params = useParams();

  useLayoutEffect(() => {
    axios
      .get(`/api/load-course?id=${params.id}`)
      .then((apiCourse) => {
        console.log(apiCourse.data);
        setCourse(apiCourse.data);
      })
      .catch((error) => {
        err = error;
        redirect("./");
      });
    setCurrentLesson(course?.lessons[0]);
  }, []);

  return {course, currentLesson, setCurrentLesson};
}