import axios from "axios";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CourseType, LessonType } from "../utils/types";

export function useCourse() {
  let [course, setCourse] = useState<CourseType>();
  let [currentLessonId, setCurrentLessonId] = useState<string>();
  let [currentModuleId, setCurrentModuleId] = useState<string>();
  let err = "";
  const params = useParams();

  const getLesson = (moduleId: string, lessonId: string) => {
    console.log(moduleId, lessonId);
    const module = course?.modules.find((element) => element._id === moduleId);
    const lesson = module?.lessons.find((element) => element._id === lessonId);
    return lesson || null;
  };

  const setLesson = (moduleId: string, lessonId: string) => {
    setCurrentLessonId(lessonId);
    setCurrentModuleId(moduleId);
  }

  let lesson: LessonType | null = null;
  if (currentLessonId && currentModuleId) {
    lesson = getLesson(currentModuleId, currentLessonId);
  }

  useEffect(() => {
    axios
      .get(`/api/courses/${params.id}`)
      .then((apiCourse) => {
        setCourse(apiCourse.data);
      })
      .catch((error) => {
        err = error;
        redirect("./");
      });
  }, []);

  useEffect(() => {
    setCurrentLessonId(course?.modules[0].lessons[0]._id);
    setCurrentModuleId(course?.modules[0]._id);
  }, [course])

  return { setLesson, course, currentLessonId, currentModuleId, lesson };
}
