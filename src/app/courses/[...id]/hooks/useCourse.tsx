import axios from "axios";
import { redirect, useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CourseType, CurrentLessonType, LessonType } from "../utils/types";

export function useCourse() {
  let [course, setCourse] = useState<CourseType>();
  let [currentLessonId, setCurrentLessonId] = useState<string>();
  let currentModuleId = useRef<string | null>();
  const params = useParams();

  const getLesson = (): CurrentLessonType | null => {
    const module = course?.modules.find(
      (element) => element._id === currentModuleId.current
    );
    const lesson = module?.lessons.find(
      (element) => element._id === currentLessonId
    );
    if (lesson && module) {
      const castedLesson = lesson as CurrentLessonType;
      castedLesson.moduleId = module._id;
      return castedLesson;
    }
    return null;
  };

  const setCurrentLesson = (moduleId: string, lessonId: string) => {
    setCurrentLessonId(lessonId);
    currentModuleId.current = moduleId;
  };

  let lesson: CurrentLessonType | null = getLesson();

  useEffect(() => {
    axios
      .get(`/api/courses/${params.id}`)
      .then((apiCourse) => {
        setCourse(apiCourse.data);
      })
      .catch((error) => {
        redirect("./");
      });

    setCurrentLessonId(course?.modules[0].lessons[0]._id);
    currentModuleId.current = course?.modules[0]._id;
  }, []);

  return { setCurrentLesson, course, lesson };
}
