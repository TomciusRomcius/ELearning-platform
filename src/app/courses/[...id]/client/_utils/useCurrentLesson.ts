import { ClientLessonType, CourseType } from "@/utils/types";
import { useState } from "react";

export function useCurrentLesson(course: CourseType<ClientLessonType>) {
  const [currentLesson, setCurrentLesson] = useState(course.modules[0].lessons[0]);

  if (!currentLesson) throw Error("Current lesson is not defined");

  return [currentLesson, setCurrentLesson];
}