import { createContext } from "react";
import { ClientLessonType, CourseType, LessonType } from "@/utils/types";

type CurrentLessonType = {
  lessonId: string;
  moduleId: string;
}

export type DataDetails = {
  course: CourseType<ClientLessonType>;
  currentLesson: CurrentLessonType;
  setCurrentLesson: (lesson: CurrentLessonType) => void;
  setCourse: (course: CourseType<ClientLessonType>) => void;
}

export const DataDetailsContext = createContext<DataDetails | undefined>(undefined);