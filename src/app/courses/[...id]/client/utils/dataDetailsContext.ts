import { createContext } from "react";
import { CourseType, LessonType } from "@/utils/types";

export type DataDetails = {
  course: CourseType;
  currentLesson: LessonType;
  setCurrentLesson: (lesson: LessonType) => void;
}

export const DataDetailsContext = createContext<DataDetails | undefined>(undefined);